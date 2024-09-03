"use client";

import { Project } from "@/types/Project";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Logo } from "@/types/Logo";
import Link from "next/link";

interface NavExperienceProps {
  logo: Logo[];
  selectedProjects: Project[];
  currentVideoIndex: number;
  setCurrentVideoIndex: (index: number) => void;
  isPlaying: boolean;
  isExperience: boolean;
  fadeOutAndComplete: () => void; // New prop for handling the fade-out and completion
  togglePlayPause: () => void;
}

const NavExperience: React.FC<NavExperienceProps> = ({
  logo,
  selectedProjects,
  currentVideoIndex,
  setCurrentVideoIndex,
  isPlaying,
  isExperience,
  fadeOutAndComplete,
  togglePlayPause,
}) => {
  const [temporarilyHovered, setTemporarilyHovered] = useState<number | null>(
    null
  );

  const handleMouseEnter = (index: number) => {
    setTemporarilyHovered(index);
  };

  const handleMouseLeave = () => {
    setTemporarilyHovered(null);
  };

  const getButtonClassNames = (index: number) => {
    if (
      temporarilyHovered !== null &&
      temporarilyHovered !== index &&
      currentVideoIndex === index
    ) {
      return "font-serif text-md text-white transition-text-shadow ease-in-out duration-sm"; // Remove text-shadow when another button is hovered
    }

    return `font-serif text-md text-white transition-text-shadow ease-in-out duration-sm ${
      temporarilyHovered === index || currentVideoIndex === index
        ? "text-shadow-glow"
        : ""
    }`;
  };

  return (
    <div className="absolute top-lg left-lg z-20">
    <div className="flex gap-lg items-center">
    
      <Image
        // ref={logoRef}
        onClick={fadeOutAndComplete} // Trigger fade-out and completion
        src={logo[0].image}
        width={58}
        height={58}
        className={`transition-opacity ease-in-out duration-md cursor-pointer`}
        alt=""
      />
    
    {/* <div className="absolute top-lg left-lg z-20"> */}
      <div className={`flex gap-md p-md border border-white rounded transition-all ease-in-out duration-md ${
      isExperience ? 'opacity-100' : 'opacity-0'
    }`}>
        {selectedProjects.map((_, index) => (
          <button
            key={index}
            className={getButtonClassNames(index)}
            onClick={() => setCurrentVideoIndex(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="font-serif text-md text-white p-2 hover:text-shadow-glow transition-text-shadow ease-in-out duration-sm"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
    </div>
  );
};

export default NavExperience;
