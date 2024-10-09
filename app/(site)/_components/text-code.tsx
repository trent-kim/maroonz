"use client";

import { useEffect, useRef, useState } from "react";
import { BlackCode } from "@/types/BlackCode";

interface TextCodeProps {
  textCodeContainerRef: React.RefObject<HTMLDivElement>;
  blackCode: BlackCode[];
  speed?: number;
  onComplete?: () => void; // Add onComplete prop
}

const TextCode: React.FC<TextCodeProps> = ({
  textCodeContainerRef,
  blackCode,
  speed = 100,
  onComplete,
}) => {
  const [displayedCodes, setDisplayedCodes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [typingStopped, setTypingStopped] = useState(false); // Track if typing should stop

  useEffect(() => {
    if (typingStopped) return; // Stop typing if the component should stop

    const currentCodeIndex = currentIndex % blackCode.length;
    const currentCode = blackCode[currentCodeIndex];
    const formattedValue = currentCode.numberBoolean
      ? currentCode.value
      : `"${currentCode.value}"`;

    const fullCode = `"${currentCode.name}": ${formattedValue}`;

    if (currentCharIndex < fullCode.length) {
      const timeout = setTimeout(() => {
        setDisplayedCodes((prev) => {
          const updatedCodes = [...prev];
          if (updatedCodes[currentIndex]) {
            updatedCodes[currentIndex] += fullCode[currentCharIndex];
          } else {
            updatedCodes.push(fullCode[currentCharIndex]);
          }
          return updatedCodes;
        });
        setCurrentCharIndex(currentCharIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // The current line has fully typed out
      if (onComplete && !typingStopped) {
        setIsEnd(true);
        setTypingStopped(true); // Stop further typing
        onComplete(); // Trigger onComplete callback when a line finishes typing
      }

      // Move to the next code element if typing should continue
      if (!typingStopped) {
        setCurrentCharIndex(0);
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [
    currentCharIndex,
    currentIndex,
    blackCode,
    speed,
    onComplete,
    typingStopped,
  ]);

  useEffect(() => {
    const container = textCodeContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [displayedCodes, textCodeContainerRef]);

  return (
    <div
      ref={textCodeContainerRef}
      className={`hidden md:block row-start-2 col-start-1 overflow-hidden transition-all ease-in-out duration-md ${
        isEnd ? "opacity-0" : "opacity-100"
      }`}
    >
      <ul className="space-y-2">
        {displayedCodes.map((code, index) => (
          <li
            key={index}
            className="font-body text-sm text-white whitespace-pre-wrap break-words"
          >
            {code}
            {index === currentIndex && !typingStopped && (
              <span className="inline-block w-[6px] h-[12px] bg-white animate-caret ml-1"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextCode;
