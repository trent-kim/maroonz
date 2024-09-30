"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import QuestionOrb from "./question-orb";
import QuestionCard from "./question-card";
import { Category } from "@/types/Category";
import { Project } from "@/types/Project";

// Define AnimationClass type
type AnimationClass = "up-down-one" | "up-down-two" | "up-down-three";

interface Preference {
  key: string;
  value: boolean;
}

interface QuestionsProps {
  completedContainerRef: React.RefObject<HTMLDivElement>;
  completedMobileContainerRef: React.RefObject<HTMLDivElement>;
  orbContainerRef: React.RefObject<HTMLDivElement>;
  questionsContainerRef: React.RefObject<HTMLDivElement>;
  categories: Category[];
  projects: Project[];
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
  setIsQuestions: Dispatch<SetStateAction<boolean>>;
  setIsQuestionsEnd: Dispatch<SetStateAction<boolean>>;
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

const Questions: React.FC<QuestionsProps> = ({
  completedContainerRef,
  completedMobileContainerRef,
  orbContainerRef,
  questionsContainerRef,
  categories,
  projects,
  setIsSubmitted,
  setIsQuestions,
  setIsQuestionsEnd,
}) => {
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
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const animationClasses = useRef<AnimationClass[]>([]); // Ensure typing is correct
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPreferences = sessionStorage.getItem("preferences");
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  // Function to calculate positions based on the current container size
  const calculatePositions = useCallback(() => {
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
  }, [containerSize.width, containerSize.height, categories]);

  // Get the container size initially
  useEffect(() => {
    const container = orbContainerRef.current;
    if (container) {
      const boundingRect = container.getBoundingClientRect();
      setContainerSize({
        width: boundingRect.width,
        height: boundingRect.height,
      });
    }
  }, [orbContainerRef]);

  // Calculate positions whenever the container size changes or categories change
  useEffect(() => {
    calculatePositions();
  }, [containerSize, categories, calculatePositions]);

  // Handle window resize to recalculate the container size and positions
  useEffect(() => {
    const handleResize = () => {
      const container = orbContainerRef.current;
      if (container) {
        const boundingRect = container.getBoundingClientRect();
        setContainerSize({
          width: boundingRect.width,
          height: boundingRect.height,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orbContainerRef]);

  // Assign animation classes only on the first render
  useEffect(() => {
    const classes: AnimationClass[] = [
      "up-down-one",
      "up-down-two",
      "up-down-three",
    ];
    animationClasses.current = categories.map(
      () => classes[Math.floor(Math.random() * classes.length)]
    );
  }, [categories]);

  // Store filteredProjects in sessionStorage whenever it updates
  useEffect(() => {
    if (filteredProjects.length > 0) {
      sessionStorage.setItem(
        "filteredProjects",
        JSON.stringify(filteredProjects)
      );
    }
  }, [filteredProjects]);

  const handlePreferenceChange = useCallback(
    (key: string, index: number, value: boolean, isLast: boolean = false) => {
      console.log("Value:", value);
      setPreferences((prev) => {
        const updatedPreferences = [...prev];
        const preferenceIndex = updatedPreferences.findIndex(
          (p) => p.key === key
        );

        if (preferenceIndex >= 0) {
          updatedPreferences[preferenceIndex].value = value;
        } else {
          updatedPreferences.push({ key, value });
        }

        console.log("Preferences on Change:", updatedPreferences);

        // If it's the last question, set the flag to trigger submission
        if (isLast) {
          setPendingSubmit(true);
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
    setPendingSubmit(false); // Reset the flag

    // Step 1: Filter categories based on preferences
    const filteredCategories = categories
      .filter((category, index) => preferences[index].value)
      .map((category) => category.category);

    console.log(
      "Filtered Categories based on Preferences:",
      filteredCategories
    );

    // Step 2: Filter projects based on the filtered categories
    const filteredProjects = projects.filter((project) => {
      // Check if the project has any of the filtered categories
      return project.categories.every((category) =>
        filteredCategories.includes(category)
      );
    });

    if (filteredProjects.length === 0) {
      console.warn("No projects matched the preferences.");
    }

    // Step 3: Shuffle and select projects to display
    const shuffledProjects = filteredProjects.sort(() => 0.5 - Math.random());
    const selectedProjects = shuffledProjects.slice(0, 6);

    setFilteredProjects(filteredProjects);
    setVisibleProjects(selectedProjects);

    questionRefs[currentQuestionIndex].current!.style.opacity = "0";
    orbRefs[prevOrbIndex].current!.style.opacity = "0";
    setIsSelected(false);
    setIsQuestionsEnd(false);
    setIsQuestions(false);

    setTimeout(() => {
      questionRefs[currentQuestionIndex].current!.style.visibility = "hidden";
      orbRefs[prevOrbIndex].current!.style.visibility = "hidden";
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 3000);
    setIsSubmitted(true);
  }, [
    preferences,
    projects,
    categories,
    currentQuestionIndex,
    questionRefs,
    orbRefs,
    prevOrbIndex,
    setIsSubmitted,
    setIsQuestions,
    setIsQuestionsEnd,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preferences", JSON.stringify(preferences));
    }

    if (pendingSubmit) {
      handleSubmit();
    }
  }, [handleSubmit, preferences, pendingSubmit]);

  const handleNextQuestion = useCallback(
    (orbIndex: number) => {
      setIsQuestions(true);
      const newOrbList = currentOrbList.filter((item) => item !== orbIndex);

      if (currentQuestionIndex === 0 && !isSelected) {
        questionRefs[currentQuestionIndex].current!.style.visibility =
          "visible";
        questionRefs[currentQuestionIndex].current!.style.opacity = "100";

        setPrevOrbIndex(orbIndex);
        orbRefs[orbIndex].current!.style.color = "#000000";
        orbRefs[orbIndex].current!.style.backgroundColor = "#FFFFFF";
        // orbRefs[orbIndex].current!.style.boxShadow = '0px 0px 6px 3px #FFFFFF';

        setIsSelected(true);

        setCurrentOrbList(newOrbList);
      } else if (currentQuestionIndex < categories.length - 1) {
        questionRefs[currentQuestionIndex].current!.style.opacity = "0";

        orbRefs[prevOrbIndex].current!.style.opacity = "0";
        // orbRefs[orbIndex].current!.style.boxShadow = 'none';
        setIsSelected(false);
        setIsQuestions(false);

        setTimeout(() => {
          setIsQuestions(true);
          setIsSelected(true);
          questionRefs[currentQuestionIndex].current!.style.visibility =
            "hidden";
          questionRefs[currentQuestionIndex + 1].current!.style.visibility =
            "visible";
          questionRefs[currentQuestionIndex + 1].current!.style.opacity = "100";
          setCurrentQuestionIndex(currentQuestionIndex + 1);

          orbRefs[prevOrbIndex].current!.style.visibility = "hidden";
          orbRefs[orbIndex].current!.style.color = "#000000";
          orbRefs[orbIndex].current!.style.backgroundColor = "#FFFFFF";
          // orbRefs[orbIndex].current!.style.boxShadow = '0px 0px 6px 3px #FFFFFF';

          setPrevOrbIndex(orbIndex);
          setCurrentOrbList(newOrbList);
        }, 3000);
      }
    },
    [
      prevOrbIndex,
      currentQuestionIndex,
      isSelected,
      currentOrbList,
      questionRefs,
      orbRefs,
      categories.length,
      setIsQuestions,
    ]
  );

  return (
    <>
      <div
        ref={completedContainerRef}
        className="hidden md:block row-start-2 col-start-1 invisible opacity-0 transition-all ease-in-out duration-md"
      >
        <div className="flex md:justify-end">
          <span className="font-body text-sm text-white">
            Questions Completed<br></br>
            {currentQuestionIndex}/{categories.length}
          </span>
        </div>
      </div>
      <div className="flex flex-col row-start-2 row-span-2 col-start-1 col-span-1 md:col-start-2 md:col-span-1 xl:col-start-2 xl:col-span-3">
        <div
          ref={completedMobileContainerRef}
          className="flex md:hidden invisible opacity-0 transition-all ease-in-out duration-md"
        >
          <span className="font-body text-sm text-white">
            Questions Completed<br></br>
            {currentQuestionIndex}/{categories.length}
          </span>
        </div>
        <div
          ref={orbContainerRef}
          className="w-full h-full invisible opacity-0 transition-opacity ease-in-out duration-md relative"
        >
          {positions.map((position, index) => (
            <QuestionOrb
              key={index}
              position={position}
              orbRef={orbRefs[index]}
              onClick={() =>
                currentQuestionIndex === 0 && !isSelected
                  ? handleNextQuestion(index)
                  : null
              }
              animationClass={animationClasses.current[index]} // Correctly typed animation class
              isSelected={isSelected}
            />
          ))}
        </div>
      </div>
      <div
        ref={questionsContainerRef}
        className="row-start-4 md:row-start-3 col-start-1 md:col-start-3 xl:col-start-5 content-end invisible opacity-0 transition-opacity ease-in-out duration-md z-10"
      >
        <div className="relative">
          {categories.map(({ question }, index) => (
            <QuestionCard
              key={index}
              question={question}
              onPreferenceChange={(value) =>
                handlePreferenceChange(
                  `${index}`,
                  index,
                  value,
                  index === categories.length - 1
                )
              }
              onNext={() =>
                handleNextQuestion(
                  currentOrbList[
                    Math.floor(Math.random() * currentOrbList.length)
                  ]
                )
              }
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
