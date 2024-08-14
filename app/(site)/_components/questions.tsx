"use client";

import { Category } from "@/types/Category";
import { Project } from "@/types/Project";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface Preference {
  key: string;
  value: boolean;
}

interface QuestionsProps {
  categories: Category[];
  projects: Project[];
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getRandomPosition = (
  maxWidth: number,
  maxHeight: number,
  orbWidth: number,
  orbHeight: number,
  existingPositions: Position[]
): Position | null => {
  const maxAttempts = 100;
  let attempts = 0;
  let position: Position;

  const isOverlapping = (newPos: Position) => {
    return existingPositions.some((pos) => {
      return (
        newPos.x < pos.x + pos.width &&
        newPos.x + orbWidth > pos.x &&
        newPos.y < pos.y + pos.height &&
        newPos.y + orbHeight > pos.y
      );
    });
  };

  do {
    const x = Math.floor(Math.random() * (maxWidth - orbWidth));
    const y = Math.floor(Math.random() * (maxHeight - orbHeight));
    position = { x, y, width: orbWidth, height: orbHeight };

    const withinBounds =
      position.x >= 0 &&
      position.y >= 0 &&
      position.x + orbWidth <= maxWidth &&
      position.y + orbHeight <= maxHeight;

    attempts++;
    if (withinBounds && !isOverlapping(position)) {
      return position;
    }
  } while (attempts < maxAttempts);

  return null;
};

// Orb Component
const Orb: React.FC<{
  position: Position;
  onClick: () => void;
  orbRef: React.RefObject<HTMLDivElement>;
}> = ({ position, onClick, orbRef }) => (
  <div
    ref={orbRef}
    onClick={onClick}
    className="font-mono text-sm text-white w-md h-md border border-white rounded-full flex justify-center items-center opacity-100 hover:shadow-glow transition-all ease-in-out duration-1.5 cursor-pointer"
    style={{
      position: "absolute",
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
    }}
  >
    ?
  </div>
);

// QuestionCard Component
const QuestionCard: React.FC<{
  question: string;
  isSelected: boolean;
  onPreferenceChange: (value: boolean) => void;
  onNext: () => void;
  onSubmit: () => void;
  questionRef: React.RefObject<HTMLDivElement>;
  yesRef: React.RefObject<HTMLSpanElement>;
  noRef: React.RefObject<HTMLSpanElement>;
  isLastQuestion: boolean;
}> = ({
  question,
  isSelected,
  onPreferenceChange,
  onNext,
  onSubmit,
  questionRef,
  yesRef,
  noRef,
  isLastQuestion,
}) => {
  const handleMouseOver = (ref: React.RefObject<HTMLSpanElement>) => {
    if (ref.current) {
      ref.current.style.textShadow = "0px 0px 6px #FFFFFF";
    }
  };

  const handleMouseLeave = (
    ref: React.RefObject<HTMLSpanElement>,
    isSelected: boolean
  ) => {
    if (ref.current) {
      ref.current.style.textShadow = isSelected ? "0px 0px 6px #FFFFFF" : "none";
    }
  };

  return (
    <div
      ref={questionRef}
      className="flex flex-col gap-sm p-sm border border-white rounded w-full bottom-[0px] first:relative absolute invisible opacity-0 transition-opacity ease-in-out duration-1.5"
    >
      <div className="font-mono text-sm text-white">{question}</div>
      <div className="font-serif text-md text-white">
        <span
          ref={yesRef}
          onClick={() => onPreferenceChange(true)}
          onMouseEnter={() => handleMouseOver(yesRef)}
          onMouseLeave={() => handleMouseLeave(yesRef, isSelected)}
          className="transition-text-shadow ease-in-out duration-1.5 cursor-pointer"
        >
          Yes
        </span>
      </div>
      <div className="font-serif text-md text-white">
        <span
          ref={noRef}
          onClick={() => onPreferenceChange(false)}
          onMouseEnter={() => handleMouseOver(noRef)}
          onMouseLeave={() => handleMouseLeave(noRef, isSelected)}
          className="transition-text-shadow ease-in-out duration-1.5 cursor-pointer"
        >
          No
        </span>
      </div>
      <div className="font-serif text-md text-white absolute bottom-sm right-sm">
        {isLastQuestion ? (
          <span
            onClick={onSubmit}
            className={`hover:text-shadow-glow transition-all ease-in-out duration-1.5 cursor-pointer ${
              isSelected ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            Submit
          </span>
        ) : (
          <span
            onClick={onNext}
            className={`hover:text-shadow-glow transition-all ease-in-out duration-1.5 cursor-pointer ${
              isSelected ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            Next
          </span>
        )}
      </div>
    </div>
  );
};

const Questions: React.FC<QuestionsProps> = ({ categories, projects }) => {
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [prevOrbIndex, setPrevOrbIndex] = useState(0);
  const [currentOrbList, setCurrentOrbList] = useState<number[]>(() =>
    Array.from({ length: categories.length }, (_, i) => i)
  );
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [positions, setPositions] = useState<Position[]>([]);
  const orbContainerRef = useRef<HTMLDivElement | null>(null);

  const questionRefs = useMemo(
    () => categories.map(() => React.createRef<HTMLDivElement>()),
    [categories]
  );
  const orbRefs = useMemo(
    () => categories.map(() => React.createRef<HTMLDivElement>()),
    [categories]
  );
  const yesRefs = useMemo(
    () => categories.map(() => React.createRef<HTMLSpanElement>()),
    [categories]
  );
  const noRefs = useMemo(
    () => categories.map(() => React.createRef<HTMLSpanElement>()),
    [categories]
  );

  console.log('Projects', projects);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreferences = sessionStorage.getItem("preferences");
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preferences", JSON.stringify(preferences));
    }
  }, [preferences]);

  useEffect(() => {
    const container = orbContainerRef.current;
    if (container) {
      const boundingRect = container.getBoundingClientRect();
      setContainerSize({
        width: boundingRect.width,
        height: boundingRect.height,
      });
    }
  }, []);

  useEffect(() => {
    const orbWidth = 24;
    const orbHeight = 24;
    const newPositions: Position[] = [];

    categories.forEach((_, index) => {
      const position = getRandomPosition(
        containerSize.width,
        containerSize.height,
        orbWidth,
        orbHeight,
        newPositions
      );
      if (position) {
        newPositions.push(position);
      }
    });

    setPositions(newPositions);
  }, [containerSize, categories]);

  const handlePreferenceChange = useCallback(
    (key: string, index: number, value: boolean) => {
      setPreferences((prev) => {
        const updatedPreferences = [...prev];
        const preferenceIndex = updatedPreferences.findIndex((p) => p.key === key);

        if (preferenceIndex >= 0) {
          updatedPreferences[preferenceIndex].value = value;
        } else {
          updatedPreferences.push({ key, value });
        }

        return updatedPreferences;
      });

      setIsSelected(true);

      if (value) {
        yesRefs[index].current!.style.textShadow = "0px 0px 6px #FFFFFF";
        noRefs[index].current!.style.textShadow = "none";
      } else {
        yesRefs[index].current!.style.textShadow = "none";
        noRefs[index].current!.style.textShadow = "0px 0px 6px #FFFFFF";
      }
    },
    [yesRefs, noRefs]
  );

  const handleSubmit = useCallback(() => {
    const filtered = projects.filter((project) => {
      return preferences.every(({ value }, index) => {
        const category = categories[index];
        if (!category) return true;

        const projectHasCategory = project.categories.includes(category.category);
        return value ? projectHasCategory : !projectHasCategory;
      });
    });

    const shuffledProjects = filtered.sort(() => 0.5 - Math.random());
    const selectedProjects = shuffledProjects.slice(0, 6);

    setFilteredProjects(filtered);
    setVisibleProjects(selectedProjects);

    questionRefs[currentQuestionIndex].current!.style.opacity = "0";
    orbRefs[prevOrbIndex].current!.style.opacity = "0";

    setTimeout(() => {
      questionRefs[currentQuestionIndex].current!.style.visibility = "hidden";
      orbRefs[prevOrbIndex].current!.style.visibility = "hidden";
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1500);

    console.log(selectedProjects);
  }, [
    preferences,
    projects,
    categories,
    currentQuestionIndex,
    questionRefs,
    orbRefs,
    prevOrbIndex,
  ]);

  const handleNextQuestion = useCallback(
    (orbIndex: number) => {
      const newOrbList = currentOrbList.filter((item) => item !== orbIndex);

      if (currentQuestionIndex === 0 && !isSelected) {
        questionRefs[currentQuestionIndex].current!.style.visibility = "visible";
        questionRefs[currentQuestionIndex].current!.style.opacity = "100";

        setPrevOrbIndex(orbIndex);
        orbRefs[orbIndex].current!.style.backgroundColor = "#FFFFFF";
        orbRefs[orbIndex].current!.style.color = "#000000";
        setCurrentOrbList(newOrbList);
      } else if (currentQuestionIndex < categories.length - 1) {
        questionRefs[currentQuestionIndex].current!.style.opacity = "0";

        orbRefs[prevOrbIndex].current!.style.opacity = "0";
        setIsSelected(false);

        setTimeout(() => {
          questionRefs[currentQuestionIndex].current!.style.visibility = "hidden";
          questionRefs[currentQuestionIndex + 1].current!.style.visibility = "visible";
          questionRefs[currentQuestionIndex + 1].current!.style.opacity = "100";
          setCurrentQuestionIndex(currentQuestionIndex + 1);

          orbRefs[prevOrbIndex].current!.style.visibility = "hidden";
          orbRefs[orbIndex].current!.style.backgroundColor = "#FFFFFF";
          orbRefs[orbIndex].current!.style.color = "#000000";
          setPrevOrbIndex(orbIndex);
          setCurrentOrbList(newOrbList);
        }, 1500);
      }
    },
    [
      currentQuestionIndex,
      isSelected,
      currentOrbList,
      questionRefs,
      orbRefs,
      categories.length,
    ]
  );

  return (
    <>
      <div className="row-start-2 col-start-1">
        <div className="flex justify-end">
          <span className="font-mono text-sm text-white">
            Questions Completed
            <br />
            {currentQuestionIndex}/{categories.length}
          </span>
        </div>
      </div>
      <div
        ref={orbContainerRef}
        className="row-start-2 row-span-2 col-start-2 col-span-3 relative"
      >
        {positions.map((position, index) => (
          <Orb
            key={index}
            position={position}
            orbRef={orbRefs[index]}
            onClick={() =>
              (currentQuestionIndex === 0 && !isSelected) || isSelected
                ? handleNextQuestion(index)
                : null
            }
          />
        ))}
      </div>
      <div className="row-start-3 col-start-5 content-end">
        <div className="relative">
          {categories.map(({ question }, index) => (
            <QuestionCard
              key={index}
              question={question}
              isSelected={isSelected}
              onPreferenceChange={(value) =>
                handlePreferenceChange(`${index}`, index, value)
              }
              onNext={() =>
                handleNextQuestion(
                  currentOrbList[Math.floor(Math.random() * currentOrbList.length)]
                )
              }
              onSubmit={handleSubmit}
              questionRef={questionRefs[index]}
              yesRef={yesRefs[index]}
              noRef={noRefs[index]}
              isLastQuestion={currentQuestionIndex === categories.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Questions;