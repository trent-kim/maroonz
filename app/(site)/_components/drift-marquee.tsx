"use client";

import { usePathname, useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const marqueeLength: number = 3;

const DriftMarquee: React.FC<{
  driftContainerRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  isEighteen: boolean;
  isSubmitted: boolean;
  setIsDrift: Dispatch<SetStateAction<boolean>>;
}> = ({ driftContainerRef, targetRef, isEighteen, isSubmitted, setIsDrift }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Start at 0 instead of null
  const [order, setOrder] = useState<number[]>([]);
  const router = useRouter(); // Use the updated useRouter
  const pathname = usePathname(); // Get the current path
  const [isFadedIn, setIsFadedIn] = useState<boolean>(false); // Track fade-in completion

  const [isExperienceEnd, setIsExperienceEnd] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIsExperienceEnd = sessionStorage.getItem("isExperienceEnd");
      if (savedIsExperienceEnd) {
        setIsExperienceEnd(JSON.parse(savedIsExperienceEnd));
      }
    }
  }, []);

  useEffect(() => {
    setOrder(shuffleArray([0, 1, 2]));

    const savedIsDriftToHome = sessionStorage.getItem("isDriftToHome");
    const savedIsAToHome = sessionStorage.getItem("isAToHome");

    if (!isEighteen) {
      setIsFadedIn(false);
    } else if (savedIsAToHome === "true" || savedIsDriftToHome === "true" || isEighteen) {
      // Assume fade-in duration matches Tailwind's transition duration
      const fadeInTimeout = setTimeout(() => {
        setIsFadedIn(true); // Mark that the fade-in is complete
        setCurrentIndex(0); // Start displaying the first item
      }, 3000); // Adjust this to match your fade-in timing

      return () => clearTimeout(fadeInTimeout);
    } else {
      setIsFadedIn(true); // Mark that the fade-in is complete
      setCurrentIndex(0); // Start displaying the first item
    }
  }, [isEighteen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % marqueeLength;
      });
    }, 12000); // Adjust the duration as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setOrder(shuffleArray([0, 1, 2]));
    }
  }, [currentIndex]);

  const shuffleArray = (array: number[]): number[] => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleDriftClick = () => {
    if (typeof window !== "undefined") {
      const savedFilteredProjects = sessionStorage.getItem("filteredProjects");
      setIsExperienceEnd(false);
      sessionStorage.setItem("isExperienceEnd", JSON.stringify(false));
      setIsDrift(true);
      targetRef.current!.style.opacity = "0";

      if (savedFilteredProjects) {
        const filteredProjects = JSON.parse(savedFilteredProjects);

        // Step 3: Shuffle and select projects to display
        const shuffledProjects = filteredProjects.sort(
          () => 0.5 - Math.random()
        );
        const selectedProjects = shuffledProjects.slice(0, 6);

        // Store selected projects in sessionStorage
        sessionStorage.setItem(
          "selectedProjects",
          JSON.stringify(selectedProjects)
        );

        setTimeout(() => {
          // Navigate to the drift page
          router.push("/drift");
        }, 3000);
      }
    }
  };

  return (
    <div
      ref={driftContainerRef}
      className="row-start-4 col-start-1 md:col-start-2 xl:col-start-3 content-end invisible transition-all ease-in-out duration-md"
    >
      <div
        className={`border border-white rounded p-md opacity-0 md:opacity-100 flex flex-col overflow-x-hidden transition-opacity ease-in-out duration-md delay-[6000ms] ${isSubmitted && "opacity-100"}`}
      >
        {order.map((index) => (
          <div
            key={index}
            className={`font-serif text-md text-white translate-x-[-20%] animate-marquee 
              ${isEighteen && isFadedIn && currentIndex === index ? "visible" : "invisible"} ${isSubmitted ? "blur-none" : "blur"}`}
            style={{
              transition: "filter 3000ms ease-in-out",
              transitionDelay: "3000ms",
            }}
          >
            <span
              className={` ${isSubmitted ? "hover:text-shadow-glow cursor-pointer" : "cursor-default"}`}
              style={{ transition: "text-shadow 500ms ease-in-out" }}
              onClick={isSubmitted ? handleDriftClick : undefined}
            >
              {isSubmitted ? "Drift" : "Drift"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriftMarquee;
