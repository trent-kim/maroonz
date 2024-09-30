"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface BarAudioProps {
  src: string;
  progressBarRef: React.RefObject<HTMLAudioElement>;
  progressBarContainerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  title: string;
  name: string;
}

const BarAudio: React.FC<BarAudioProps> = ({
  src,
  progressBarRef,
  progressBarContainerRef,
  progress,
  setProgress,
  title,
  name,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Update the progress bar as the audio plays
  const handleTimeUpdate = () => {
    if (progressBarRef.current && progressRef.current) {
      const currentTime = progressBarRef.current.currentTime;
      const duration = progressBarRef.current.duration;
      const percentage = (currentTime / duration) * 100;
      setProgress(percentage);
    }
  };

  // Handle mute/unmute toggle
  const handleMuteToggle = () => {
    if (progressBarRef.current) {
      progressBarRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={progressBarContainerRef}
      className="row-start-4 md:row-start-3 col-start-1 content-end invisible opacity-0 transition-all ease-in-out duration-md"
    >
      <audio
        ref={progressBarRef}
        src={src}
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate} // Ensures the progress bar updates once duration is loaded
      />
      <div
        className="group relative border border-white rounded overflow-hidden cursor-pointer"
        onClick={handleMuteToggle} // Toggle mute/unmute on click
      >
        <div
          className={`relative w-full rounded flex flex-col gap-sm cursor-pointer group-hover:blur transition-blur ease-in-out duration-sm`}
        >
          <div
            ref={progressRef}
            className="absolute top-[-12px] left-[-12px] h-[calc(100%+24px)] bg-white transition-all duration-100"
            style={{ width: `calc(${progress}% + 12px)` }}
          />
          <div className="font-mono text-sm text-white mix-blend-difference pt-md pl-md">
            Introduction By
          </div>
          <div className="font-serif text-md text-white mix-blend-difference pb-md pl-md">
            {name}
          </div>
        </div>
        <div className="font-mono text-sm text-white mix-blend-difference absolute top-[0px] w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-sm">
          {isMuted ? "Unmute" : "Mute"}
        </div>
      </div>
    </div>
  );
};

export default BarAudio;
