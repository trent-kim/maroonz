"use client";

import { useEffect, useRef, useState } from "react";

interface TextProjectProps {
  text: string;
  speed?: number;
}

const TextAbout: React.FC<TextProjectProps> = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const TextProjectContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

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
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5;
      shouldAutoScroll.current = isAtBottom;
    }
  };

  return (
    <div
      ref={TextProjectContainerRef}
      className=" row-start-2 row-span-2 md:row-start-2 md:row-span-3 col-start-1 col-span-1 md:col-start-2 md:col-span-2 xl:col-start-2 xl:col-span-4 border border-white rounded flex flex-col gap-md p-md overflow-scroll"
      onScroll={handleScroll}
    >
      <div className="font-body text-sm text-white">Info</div>
      <div className="relative flex">
        <div className="font-body text-sm text-white whitespace-pre-wrap break-words">
          {displayedText}

          <span className="inline-block w-[6px] h-[12px] bg-white animate-caret ml-1"></span>
        </div>
      </div>
    </div>
  );
};

export default TextAbout;
