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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInterrupted = useRef(false);

  // Detect iOS (unconditional)
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Memoize length to stabilize deps
  const tracksLength = useMemo(() => initialTracks.length, [initialTracks]);

  const currentTrack = initialTracks[currentTrackIndex];

  // Memoized skip function to stabilize deps
  const skip = useCallback((direction: "prev" | "next") => {
    setCurrentTrackIndex((prev) =>
      direction === "next" ? (prev + 1) % tracksLength : (prev - 1 + tracksLength) % tracksLength
    );
  }, [tracksLength]);

  // Howl instance creation (unconditional, but only used if !isIOS)
  useEffect(() => {
    if (isIOS) return; // Skip for iOS

    if (howlerRef.current) {
      howlerRef.current.stop();
      howlerRef.current.unload();
    }

    howlerRef.current = new Howl({
      src: [currentTrack.src],
      format: ['mp3'],
      html5: true,
      onload: () => {
        setProgress(0);
        if (navigator.mediaSession) {
          navigator.mediaSession.setPositionState({
            duration: howlerRef.current?.duration() || 0,
            position: 0,
          });
        }
      },
      onend: () => {
        setCurrentTrackIndex((prev) => (prev + 1) % tracksLength);
      },
      onplay: () => {
        setIsPlaying(true);
        isInterrupted.current = false;
      },
      onpause: () => setIsPlaying(false),
    });

    if (isPlaying && howlerRef.current) {
      howlerRef.current.once('load', () => {
        howlerRef.current?.play();
      });
    }

    return () => {
      if (howlerRef.current) {
        howlerRef.current.stop();
        howlerRef.current.unload();
      }
    };
  }, [currentTrackIndex, currentTrack.src, tracksLength, isPlaying, isIOS]);

  // Native audio logic (unconditional, but only active if isIOS)
  useEffect(() => {
    if (!isIOS) return; // Skip for non-iOS

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();
    setProgress(0);

    if (navigator.mediaSession) {
      navigator.mediaSession.setPositionState({
        duration: audio.duration || 0,
        position: 0,
      });
    }

    if (isPlaying) {
      audio.play().catch((e) => console.warn('iOS play failed:', e));
    }

    const handleEnded = () => {
      skip('next');
    };
    const handlePlay = () => {
      setIsPlaying(true);
      isInterrupted.current = false;
    };
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);

        if (navigator.mediaSession) {
          navigator.mediaSession.setPositionState({
            duration: audio.duration,
            position: audio.currentTime,
          });
        }
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrackIndex, currentTrack.src, isPlaying, skip, tracksLength, isIOS]);

  // Progress update loop (Howler only)
  useEffect(() => {
    if (isIOS) return; // Skip for iOS (uses timeupdate)

    let animationId: number;
    let lastProgressTime = Date.now();
    const updateProgress = () => {
      const howler = howlerRef.current;
      if (howler && isPlaying) {
        const duration = howler.duration();
        if (duration > 0) {
          const currentPosition = howler.seek();
          setProgress((currentPosition / duration) * 100);

          if (navigator.mediaSession && duration > 0) {
            navigator.mediaSession.setPositionState({
              duration,
              position: currentPosition,
            });
          }

          if (Date.now() - lastProgressTime > 7000 && currentPosition === howler.seek()) {
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
  }, [isPlaying, isIOS]);

  // iOS heartbeat (via timeupdate, separate for clarity)
  useEffect(() => {
    if (!isIOS) return;

    let lastTime = 0;
    const audio = audioRef.current;
    if (!audio) return;

    const checkStall = () => {
      if (isPlaying && audio.currentTime === lastTime) {
        // Simple stall check (timeupdate fires ~250ms)
        if (Date.now() - (lastTime * 1000) > 7000) {
          setIsPlaying(false);
          isInterrupted.current = true;
        }
      }
      lastTime = audio.currentTime;
    };

    audio.addEventListener('timeupdate', checkStall);
    return () => audio.removeEventListener('timeupdate', checkStall);
  }, [isPlaying, isIOS]);

  // Sync Media Session playbackState
  useEffect(() => {
    if (navigator.mediaSession) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  // Media Session API setup
  useEffect(() => {
    if (!navigator.mediaSession) return;

    const updateMetadata = () => {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: 'Vispea Sound Machine',
      });
    };
    updateMetadata();

    navigator.mediaSession.setActionHandler('play', () => {
      if (isIOS) {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch((e) => console.warn('iOS play failed:', e));
          setIsPlaying(true);
        }
      } else {
        const howler = howlerRef.current;
        if (howler) {
          howler.play();
          setIsPlaying(true);
        }
      }
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      if (isIOS) {
        const audio = audioRef.current;
        if (audio) {
          audio.pause();
          setIsPlaying(false);
        }
      } else {
        const howler = howlerRef.current;
        if (howler) {
          howler.pause();
          setIsPlaying(false);
        }
      }
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      setTimeout(() => skip('next'), 100);
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      setTimeout(() => skip('prev'), 100);
    });

    navigator.mediaSession.setActionHandler('seekforward', (details: MediaSessionActionDetails) => {
      if (isIOS) {
        const audio = audioRef.current;
        if (audio) {
          const offset = details.seekOffset || 10;
          audio.currentTime = Math.min(audio.currentTime + offset, audio.duration);
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      } else {
        const howler = howlerRef.current;
        if (howler) {
          const offset = details.seekOffset || 10;
          const newPos = Math.min(howler.seek() + offset, howler.duration());
          howler.seek(newPos);
          setProgress((newPos / howler.duration()) * 100);
        }
      }
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details: MediaSessionActionDetails) => {
      if (isIOS) {
        const audio = audioRef.current;
        if (audio) {
          const offset = details.seekOffset || 10;
          audio.currentTime = Math.max(audio.currentTime - offset, 0);
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      } else {
        const howler = howlerRef.current;
        if (howler) {
          const offset = details.seekOffset || 10;
          const newPos = Math.max(howler.seek() - offset, 0);
          howler.seek(newPos);
          setProgress((newPos / howler.duration()) * 100);
        }
      }
    });

    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('seekforward', null);
      navigator.mediaSession.setActionHandler('seekbackward', null);
    };
  }, [currentTrack, isPlaying, skip, isIOS]);

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isInterrupted.current) {
        isInterrupted.current = false;
        if (isIOS) {
          const audio = audioRef.current;
          if (audio && isPlaying && audio.paused) {
            setIsPlaying(false);
          }
        } else {
          const howler = howlerRef.current;
          if (howler && isPlaying && !howler.playing()) {
            setIsPlaying(false);
          }
        }
      } else if (document.hidden && isPlaying) {
        isInterrupted.current = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, isIOS]);

  const togglePlay = () => {
    if (isIOS) {
      const audio = audioRef.current;
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play().catch((e) => console.warn('iOS play failed:', e));
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      const howler = howlerRef.current;
      if (howler) {
        if (howler.playing()) {
          howler.stop();
        }
        if (isPlaying) {
          howler.pause();
        } else {
          howler.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isIOS) {
      const audio = audioRef.current;
      if (audio) {
        const value = parseFloat(e.target.value);
        if (audio.duration > 0) {
          audio.currentTime = (value / 100) * audio.duration;
          setProgress(value);
        }
      }
    } else {
      const howler = howlerRef.current;
      if (howler) {
        const value = parseFloat(e.target.value);
        const duration = howler.duration();
        if (duration > 0) {
          const newPos = (value / 100) * duration;
          howler.seek(newPos);
          setProgress(value);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 text-sm text-center text-slate-300">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">Vispea Sound Machine</span>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-black text-white p-4 shadow-2xl z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">🎵</div>
            <div>
              <p className="font-semibold text-sm">{currentTrack.title}</p>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 sm:space-x-4">
            <SkipBack onClick={() => skip("prev")} className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <button onClick={togglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <SkipForward onClick={() => skip("next")} className="w-6 h-6 cursor-pointer hover:opacity-80" />
          </div>
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
        {isIOS && <audio ref={audioRef} preload="auto" />}
      </div>
    </div>
  );
};

export default AudioPlayer;