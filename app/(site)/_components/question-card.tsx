import React, { useState } from "react";
import { set } from "sanity";

const QuestionCard: React.FC<{
  question: string;
  isSelected: boolean;
  onPreferenceChange: (value: boolean) => void;
  onNext: () => void;
  questionRef: React.RefObject<HTMLDivElement>;
  yesRef: React.RefObject<HTMLSpanElement>;
  noRef: React.RefObject<HTMLSpanElement>;
  isLastQuestion: boolean;
}> = ({
  question,
  isSelected,
  onPreferenceChange,
  onNext,
  questionRef,
  yesRef,
  noRef,
  isLastQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no" | null>(
    null
  );
  const [temporarilyHovered, setTemporarilyHovered] = useState<"yes" | "no" | null>(null);

  const handleMouseOver = (option: "yes" | "no", ref: React.RefObject<HTMLSpanElement>) => {
    setTemporarilyHovered(option);
    if (ref.current) {
      ref.current.style.textShadow =
        "0px 0px 1px #FFFFFF, 0px 0px 2px #FFFFFF, 0px 0px 3px #FFFFFF, 0px 0px 6px #FFFFFF";
    }
  };

  const handleMouseLeave = (option: "yes" | "no", ref: React.RefObject<HTMLSpanElement>) => {
    setTemporarilyHovered(null);
    if (ref.current) {
      if (selectedOption === option) {
        ref.current.style.textShadow =
          "0px 0px 1px #FFFFFF, 0px 0px 2px #FFFFFF, 0px 0px 3px #FFFFFF, 0px 0px 6px #FFFFFF";
      } else {
        ref.current.style.textShadow = "none";
      }
    }
  };

  const handleOptionClick = (option: "yes" | "no", value: boolean) => {
    setSelectedOption(option);
    onPreferenceChange(value);
    if (!isLastQuestion) {
      onNext();
    }
  };

  return (
    <div
      ref={questionRef}
      className="flex flex-col gap-md p-md border border-white rounded w-full bottom-[0px] first:relative absolute invisible opacity-0 transition-opacity ease-in-out duration-md"
    >
      <div className="font-mono text-sm text-white">{question}</div>
      <div className="font-serif text-md text-white">
        <span
          ref={yesRef}
          onClick={() => handleOptionClick("yes", true)}
          onMouseEnter={() => handleMouseOver("yes", yesRef)}
          onMouseLeave={() => handleMouseLeave("yes", yesRef)}
          className={`transition-text-shadow ease-in-out duration-sm cursor-pointer ${selectedOption === "yes" && 'text-shadow-glow'}`}
          // style={{
          //   textShadow:
          //     temporarilyHovered === "no" && selectedOption === "yes"
          //       ? "none"
          //       : selectedOption === "yes" || temporarilyHovered === "yes"
          //       ? "0px 0px 1px #FFFFFF, 0px 0px 2px #FFFFFF, 0px 0px 3px #FFFFFF, 0px 0px 6px #FFFFFF"
          //       : "none",
          // }}
        >
          Yes
        </span>
        <br></br>
        <span
          ref={noRef}
          onClick={() => handleOptionClick("no", false)}
          onMouseEnter={() => handleMouseOver("no", noRef)}
          onMouseLeave={() => handleMouseLeave("no", noRef)}
          className={`transition-text-shadow ease-in-out duration-sm cursor-pointer ${selectedOption === "no" && 'text-shadow-glow'}`}
          // style={{
          //   textShadow:
          //     temporarilyHovered === "yes" && selectedOption === "no"
          //       ? "none"
          //       : selectedOption === "no" || temporarilyHovered === "no"
          //       ? "0px 0px 1px #FFFFFF, 0px 0px 2px #FFFFFF, 0px 0px 3px #FFFFFF, 0px 0px 6px #FFFFFF"
          //       : "none",
          // }}
        >
          No
        </span>
      </div>
      {/* <div className={`font-serif text-md text-white absolute bottom-md right-md z-10 transition-all ease-in-out duration-md ${
              isSelected ? "opacity-100 visible" : "opacity-0 invisible"
            }`}>
        {isLastQuestion ? (
          <span
            onClick={onSubmit}
            className={`hover:text-shadow-glow transition-all ease-in-out duration-sm cursor-pointer `}
          >
            Submit
          </span>
        ) : (
          <span
            onClick={onNext}
            className={`hover:text-shadow-glow transition-all ease-in-out duration-sm cursor-pointer $`}
          >
            Next
          </span>
        )}
      </div> */}
    </div>
  );
};

export default QuestionCard;
