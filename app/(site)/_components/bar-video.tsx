"use client";

import MuxPlayerElement from "@mux/mux-player";
import { Dispatch, SetStateAction, useState } from "react";

interface BarVideoProps {
  src: string | null; // Allow null
  progressRef: React.RefObject<HTMLDivElement>;
  progressBarRef: React.RefObject<MuxPlayerElement>;
  progressBarContainerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  title: string;
  name: string;
  isVisible: boolean; // Prop to control visibility
}

const BarVideo: React.FC<BarVideoProps> = ({
  src,
  progressRef,
  progressBarRef,
  progressBarContainerRef,
  progress,
  setProgress,
  title,
  name,
  isVisible,
}) => {
  const [isMuted, setIsMuted] = useState(false);

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
      className={`row-start-4 md:row-start-3 col-start-1 content-end transition-all ease-in-out duration-md ${
        isVisible ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
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
          <div className="font-body text-sm text-white mix-blend-difference pt-md pl-md">
            Now Playing
          </div>
          <div className="font-serif text-md text-white mix-blend-difference pb-md pl-md">
            {title}
            <br />
            {name}
          </div>
        </div>
        <div className="font-body text-sm text-white mix-blend-difference absolute top-[0px] w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-sm">
          {isMuted ? "Unmute" : "Mute"}
        </div>
      </div>
    </div>
  );
};

export default BarVideo;
