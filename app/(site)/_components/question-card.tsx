import React, { useState } from "react";

const QuestionCard: React.FC<{
  question: string;
  onPreferenceChange: (value: boolean) => void;
  onNext: () => void;
  questionRef: React.RefObject<HTMLDivElement>;
  yesRef: React.RefObject<HTMLSpanElement>;
  noRef: React.RefObject<HTMLSpanElement>;
  isLastQuestion: boolean;
}> = ({
  question,
  onPreferenceChange,
  onNext,
  questionRef,
  yesRef,
  noRef,
  isLastQuestion,
}) => {
  const handleOptionClick = (option: "yes" | "no", value: boolean) => {
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
          className={`hover:text-shadow-glow transition-[text-shadow] ease-in-out duration-sm cursor-pointer `}
        >
          Yes
        </span>
        <br></br>
        <span
          ref={noRef}
          onClick={() => handleOptionClick("no", false)}
          className={`hover:text-shadow-glow transition-[text-shadow] ease-in-out duration-sm cursor-pointer `}
        >
          No
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
