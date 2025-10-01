"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Howl } from "howler";
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
  const shouldResumeRef = useRef(false);
  const endedRef = useRef(false);
  const isInterrupted = useRef(false);

  const isIOS =
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && "maxTouchPoints" in navigator && navigator.maxTouchPoints > 1));

  const tracksLength = useMemo(() => initialTracks.length, [initialTracks]);
  const currentTrack = initialTracks[currentTrackIndex];

  const skip = useCallback(
    (direction: "prev" | "next") => {
      setCurrentTrackIndex((prev) =>
        direction === "next" ? (prev + 1) % tracksLength : (prev - 1 + tracksLength) % tracksLength,
      );
    },
    [tracksLength],
  );

  useEffect(() => {
    if (isIOS) return;

    const autoResume = shouldResumeRef.current;

    if (howlerRef.current) {
      howlerRef.current.stop();
      howlerRef.current.unload();
    }

    const instance = new Howl({
      src: [currentTrack.src],
      format: ["mp3"],
      html5: true,
      pool: 1,
      onload: () => {
        setProgress(0);
        if (navigator.mediaSession) {
          navigator.mediaSession.setPositionState({
            duration: instance.duration() || 0,
            position: 0,
          });
        }
      },
      onplay: () => {
        endedRef.current = false;
        shouldResumeRef.current = true;
        isInterrupted.current = false;
        setIsPlaying(true);
      },
      onpause: () => {
        if (endedRef.current) return;
        shouldResumeRef.current = false;
        setIsPlaying(false);
      },
      onend: () => {
        endedRef.current = true;
        shouldResumeRef.current = true;
        setProgress(0);
        setCurrentTrackIndex((prev) => (prev + 1) % tracksLength);
      },
    });

    howlerRef.current = instance;

    if (autoResume) {
      if (instance.state() === "loaded") {
        instance.play();
      } else {
        instance.once("load", () => instance.play());
      }
    }

    return () => {
      instance.stop();
      instance.unload();
    };
  }, [currentTrackIndex, currentTrack.src, tracksLength, isIOS]);

  useEffect(() => {
    if (!isIOS) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();
    setProgress(0);

    const handleLoadedMetadata = () => {
      if (navigator.mediaSession) {
        navigator.mediaSession.setPositionState({
          duration: audio.duration || 0,
          position: 0,
        });
      }
      if (shouldResumeRef.current) {
        audio.play().catch((err) => console.warn("iOS autoplay failed", err));
      }
    };

    const handleEnded = () => {
      endedRef.current = true;
      shouldResumeRef.current = true;
      setProgress(0);
      skip("next");
    };

    const handlePlay = () => {
      endedRef.current = false;
      shouldResumeRef.current = true;
      isInterrupted.current = false;
      setIsPlaying(true);
    };

    const handlePause = () => {
      if (endedRef.current) return;
      shouldResumeRef.current = false;
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      if (audio.duration > 0) {
        const value = (audio.currentTime / audio.duration) * 100;
        setProgress(value);

        if (navigator.mediaSession) {
          navigator.mediaSession.setPositionState({
            duration: audio.duration,
            position: audio.currentTime,
          });
        }
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentTrackIndex, currentTrack.src, skip, isIOS]);

  useEffect(() => {
    if (isIOS) return;

    let animationId: number;

    const updateProgress = () => {
      const howler = howlerRef.current;
      if (!howler) return;

      if (howler.playing()) {
        const duration = howler.duration();
        if (duration > 0) {
          const currentPosition = howler.seek() as number;
          setProgress((currentPosition / duration) * 100);

          if (navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
              duration,
              position: currentPosition,
            });
          }
        }
        animationId = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPlaying, isIOS]);

  useEffect(() => {
    if (navigator.mediaSession) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!navigator.mediaSession) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      album: "Vispea Sound Machine",
    });

    const handlePlay = () => {
      if (isIOS) {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch((err) => console.warn("iOS play failed", err));
        }
      } else {
        const howler = howlerRef.current;
        if (howler && !howler.playing()) {
          howler.play();
        }
      }
    };

    const handlePause = () => {
      if (isIOS) {
        const audio = audioRef.current;
        audio?.pause();
      } else {
        const howler = howlerRef.current;
        howler?.pause();
      }
    };

    navigator.mediaSession.setActionHandler("play", handlePlay);
    navigator.mediaSession.setActionHandler("pause", handlePause);
    navigator.mediaSession.setActionHandler("nexttrack", () => skip("next"));
    navigator.mediaSession.setActionHandler("previoustrack", () => skip("prev"));
    navigator.mediaSession.setActionHandler("seekforward", null);
    navigator.mediaSession.setActionHandler("seekbackward", null);

    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("seekforward", null);
      navigator.mediaSession.setActionHandler("seekbackward", null);
    };
  }, [currentTrack, skip, isIOS]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          isInterrupted.current = true;
        }
        return;
      }

      if (isInterrupted.current && shouldResumeRef.current) {
        isInterrupted.current = false;
        if (isIOS) {
          const audio = audioRef.current;
          if (audio && audio.paused) {
            audio.play().catch(() => undefined);
          }
        } else {
          const howler = howlerRef.current;
          if (howler && !howler.playing()) {
            howler.play();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, isIOS]);

  const togglePlay = () => {
    if (isIOS) {
      const audio = audioRef.current;
      if (!audio) return;

      if (audio.paused) {
        audio.play().catch((err) => console.warn("iOS play failed", err));
      } else {
        audio.pause();
      }
      return;
    }

    const howler = howlerRef.current;
    if (!howler) return;

    if (howler.playing()) {
      howler.pause();
    } else {
      if (howler.state() === "unloaded") {
        howler.load();
      }
      howler.play();
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);

    if (isIOS) {
      const audio = audioRef.current;
      if (!audio || audio.duration <= 0) return;

      audio.currentTime = (value / 100) * audio.duration;
      setProgress(value);
      return;
    }

    const howler = howlerRef.current;
    if (!howler) return;

    const duration = howler.duration();
    if (duration <= 0) return;

    const newPosition = (value / 100) * duration;
    howler.seek(newPosition);
    setProgress(value);
  };

  return (
    <div className="flex flex-col gap-3 text-sm text-center text-slate-300">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-400">
        Vispea Sound Machine
      </span>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-black p-4 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-700">🎵</div>
            <div className="text-left">
              <p className="text-sm font-semibold">{currentTrack.title}</p>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 sm:space-x-4">
            <SkipBack onClick={() => skip("prev")} className="h-6 w-6 cursor-pointer hover:opacity-80" />
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <SkipForward onClick={() => skip("next")} className="h-6 w-6 cursor-pointer hover:opacity-80" />
          </div>
          <div className="mx-4 flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-600 [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </div>
        {isIOS && <audio ref={audioRef} preload="auto" crossOrigin="anonymous" />}
      </div>
    </div>
  );
};

export default AudioPlayer;