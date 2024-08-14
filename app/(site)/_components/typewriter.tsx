"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  loop?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  loop = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (loop) {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, speed * 10); // Pause before restarting
      return () => clearTimeout(timeout);
    } else {
      setIsAnimating(false);
    }
  }, [index, text, speed, loop]);

  return (
    <div className="relative flex justify-center items-center h-24">
      <div className="font-mono text-sm text-white whitespace-pre-wrap break-words text-center">
        {displayedText}
        {isAnimating && (
          <span className="inline-block w-[6px] h-[12px] bg-white animate-caret ml-1"></span>
        )}
      </div>
    </div>
  );
};

export default Typewriter;
