"use client";

import { useEffect, useRef, useState } from "react";

interface TextProjectProps {
  text: string;
  speed?: number;
  isVisible: boolean;
}

const TextProject: React.FC<TextProjectProps> = ({
  text,
  speed,
  isVisible,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const TextProjectContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  useEffect(() => {
    if (isVisible && index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, isVisible]);

  useEffect(() => {
    // Reset text and index when visibility changes to false
    setTimeout(() => {
    if (!isVisible) {
      setDisplayedText("");
      setIndex(0);
    }
  }, 3000);
  }, [isVisible]);

  
  useEffect(() => {
    const container = TextProjectContainerRef.current;

    if (container && shouldAutoScroll.current) {
      // Adding a slight delay to ensure the text is fully updated before scrolling
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    }
  }, [displayedText]);

  const handleScroll = () => {
    const container = TextProjectContainerRef.current;
    if (container) {
      // Allowing a slight margin of error to account for rounding issues in scrollTop
      const isAtBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
      shouldAutoScroll.current = isAtBottom;
    }
  };

  return (
    <div 
    ref={TextProjectContainerRef}
    className={`row-start-2 row-span-2 col-start-5 overflow-scroll transition-opacity ease-in-out duration-md ${
        isVisible ? "opacity-100" : "opacity-0"}`}
    onScroll={handleScroll}
    >
    <div className="relative flex">
      <div className="font-body text-sm text-white whitespace-pre-wrap break-words">
        {displayedText}
        
          <span className="inline-block w-[6px] h-[12px] bg-white animate-caret ml-1"></span>
        
      </div>
    </div>
    </div>
  );
};

export default TextProject;