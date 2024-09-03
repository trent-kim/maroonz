"use client";

import { usePathname, useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const marqueeLength: number = 3;

const DriftMarquee: React.FC<{
  driftContainerRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  isSubmitted: boolean;
  setIsDrift: Dispatch<SetStateAction<boolean>>;
}> = ({ driftContainerRef, targetRef, isSubmitted, setIsDrift }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const router = useRouter(); // Use the updated useRouter
  const pathname = usePathname(); // Get the current path


  useEffect(() => {
    setOrder(shuffleArray([0, 1, 2]));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === null) return 0;
        return (prevIndex + 1) % marqueeLength;
      });
    }, 12000); // Adjust the duration as needed

    return () => clearInterval(interval);
  }, [marqueeLength]);

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
      // console.log("FilteredProjects:", savedFilteredProjects);

        setIsDrift(true);
        targetRef.current!.style.opacity = "0";
      

      if (savedFilteredProjects) {
        const filteredProjects = JSON.parse(savedFilteredProjects);

        // Step 3: Shuffle and select projects to display
        const shuffledProjects = filteredProjects.sort(
          () => 0.5 - Math.random()
        );
        const selectedProjects = shuffledProjects.slice(0, 2);

        // Store selected projects in sessionStorage
        sessionStorage.setItem(
          "selectedProjects",
          JSON.stringify(selectedProjects)
        );

        sessionStorage.setItem('prevPathname', pathname);

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
      className="row-start-4 col-start-3 content-end invisible transition-all ease-in-out duration-md"
    >
      <div className="border border-white rounded p-md flex flex-col overflow-x-hidden z-10">
        {order.map((index) => (
          <div
            key={index}
            className={`font-serif text-md text-white translate-x-[-20%] animate-marquee ${
              currentIndex === index ? "visible" : "invisible"
            } ${isSubmitted ? "blur-none" : "blur"}`}
            style={{ 
              transition: "filter 3000ms ease-in-out",
              transitionDelay: '3000ms'
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
