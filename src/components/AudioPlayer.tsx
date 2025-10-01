// AudioPlayer.tsx

"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Howl } from 'howler';
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Track {
  src: string;
  title: string;
  artist: string;
}

const AudioPlayer: React.FC<{ initialTracks: Track[] }> = ({ initialTracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const howlerRef = useRef<Howl | null>(null);
  const isInterrupted = useRef(false);

  // Memoize length to stabilize deps
  const tracksLength = useMemo(() => initialTracks.length, [initialTracks]);

  const currentTrack = initialTracks[currentTrackIndex];

  // Memoized skip function to stabilize deps
  const skip = useCallback((direction: "prev" | "next") => {
    // Change track; if playing, new one will auto-start via useEffect
    setCurrentTrackIndex((prev) =>
      direction === "next" ? (prev + 1) % tracksLength : (prev - 1 + tracksLength) % tracksLength
    );
  }, [tracksLength]);

// Create new Howl instance ONLY on track change (not on play/pause)
/* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {
  if (howlerRef.current) {
    howlerRef.current.unload();
  }

  howlerRef.current = new Howl({
    src: [currentTrack.src],
    html5: true,
    onload: () => {
      // Reset progress on load
      setProgress(0);
      // Update Media Session position to 0
      if (navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: howlerRef.current?.duration() || 0,
          position: 0,
        });
      }
    },
    onend: () => {
      // Auto-advance to next track (keeps isPlaying true to auto-play new one)
      setCurrentTrackIndex((prev) => (prev + 1) % tracksLength);
    },
    onplay: () => {
      setIsPlaying(true);
      isInterrupted.current = false;
    },
    onpause: () => setIsPlaying(false),
  });

  // Auto-play new track if was playing before change
  if (isPlaying && howlerRef.current) {
    // Use once to play after load, avoiding race conditions
    howlerRef.current.once('load', () => {
      howlerRef.current?.play();
    });
  }

  return () => {
    if (howlerRef.current) {
      howlerRef.current.unload();
    }
  };
}, [currentTrackIndex, currentTrack.src, tracksLength]);
/* eslint-enable react-hooks/exhaustive-deps */

// Progress update loop (only when playing) with heartbeat for interruptions
useEffect(() => {
  let animationId: number;
  let lastProgressTime = Date.now();
  const updateProgress = () => {
    const howler = howlerRef.current;
    if (howler && isPlaying) {
      const duration = howler.duration();
      if (duration > 0) {
        const currentPosition = howler.seek();
        setProgress((currentPosition / duration) * 100);

        // Update Media Session position for lock screen seek
        if (navigator.mediaSession && duration > 0) {
          navigator.mediaSession.setPositionState({
            duration,
            position: currentPosition,
          });
        }

        // Heartbeat: Detect if stalled (no progress in 5s, but isPlaying true)
        if (Date.now() - lastProgressTime > 5000 && currentPosition === howler.seek()) {
          // Likely interrupted; pause and flag
          setIsPlaying(false);
          isInterrupted.current = true;
        }
        lastProgressTime = Date.now();
      }
      animationId = requestAnimationFrame(updateProgress);
    }
  };

  if (isPlaying) {
    updateProgress();
  }

  return () => {
    if (animationId) cancelAnimationFrame(animationId);
  };
}, [isPlaying]);

  // Sync Media Session playbackState on isPlaying changes
  useEffect(() => {
    if (navigator.mediaSession) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  // Media Session API setup for lock screen controls
  useEffect(() => {
    if (!navigator.mediaSession) return;

    // Set metadata for current track
    const updateMetadata = () => {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: 'Vispea Sound Machine',
      });
    };
    updateMetadata();

    // Action handlers
    navigator.mediaSession.setActionHandler('play', () => {
      const howler = howlerRef.current;
      if (howler) {
        howler.play();
        setIsPlaying(true);
      }
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      const howler = howlerRef.current;
      if (howler) {
        howler.pause();
        setIsPlaying(false);
      }
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      skip('next');
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      skip('prev');
    });

    // Enhanced seek handlers for lock screen scrubbing (iOS uses these for forward/back, but position sync helps scrubber)
    navigator.mediaSession.setActionHandler('seekforward', (details: MediaSessionActionDetails) => {
      const howler = howlerRef.current;
      if (howler) {
        const offset = details.seekOffset || 10;
        const newPos = Math.min(howler.seek() + offset, howler.duration());
        howler.seek(newPos);
        // Force progress update
        setProgress((newPos / howler.duration()) * 100);
      }
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details: MediaSessionActionDetails) => {
      const howler = howlerRef.current;
      if (howler) {
        const offset = details.seekOffset || 10;
        const newPos = Math.max(howler.seek() - offset, 0);
        howler.seek(newPos);
        // Force progress update
        setProgress((newPos / howler.duration()) * 100);
      }
    });

    // Cleanup on unmount
    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('seekforward', null);
      navigator.mediaSession.setActionHandler('seekbackward', null);
    };
  }, [currentTrack, isPlaying, skip]);

  // Handle visibility changes for iOS interruptions (sync state, no auto-resume to avoid duplicates)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isInterrupted.current) {
        // User returned from background: Sync state if stalled, but don't auto-play to prevent duplicates
        isInterrupted.current = false;
        // If isPlaying is true but actually paused (system interrupt), set to false for user control
        const howler = howlerRef.current;
        if (howler && isPlaying && howler.playing()) {
          // Still playing fine
        } else if (isPlaying) {
          setIsPlaying(false); // System paused it
        }
      } else if (document.hidden && isPlaying) {
        // Going background: Flag for potential interrupt
        isInterrupted.current = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

  const togglePlay = () => {
    const howler = howlerRef.current;
    if (howler) {
      // Ensure no duplicates: Pause first if somehow playing
      if (howler.playing()) {
        howler.pause();
      }
      if (isPlaying) {
        howler.pause();
      } else {
        howler.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const howler = howlerRef.current;
    if (howler) {
      const value = parseFloat(e.target.value);
      const duration = howler.duration();
      if (duration > 0) {
        const newPos = (value / 100) * duration;
        howler.seek(newPos);
        setProgress(value); // Immediate UI update
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 text-sm text-center text-slate-300">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">Vispea Sound Machine</span>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black text-white p-4 shadow-2xl z-50">
        {/* Track Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">🎵</div>
            <div>
              <p className="font-semibold text-sm">{currentTrack.title}</p>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6 sm:space-x-4">
            <SkipBack onClick={() => skip("prev")} className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <SkipForward onClick={() => skip("next")} className="w-6 h-6 cursor-pointer hover:opacity-80" />
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;