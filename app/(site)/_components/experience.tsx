// experience.tsx

"use client";
import React, { useEffect, useRef, useState, useCallback, RefObject, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import MuxPlayer from "@mux/mux-player-react";
import { Project } from "@/types/Project";
import BarVideo from "./bar-video";
import { Category } from "@/types/Category";
import MuxPlayerElement from "@mux/mux-player";
import Map from "./map";
import TextProject from "./text-project";
import { BlackCode } from "@/types/BlackCode";
import TextCode from "./text-code";
import NavExperience from "./nav-experience";
import { Logo } from "@/types/Logo";
import { useVisibility } from "../_hooks/visibility-context";

interface ExperienceProps {
  projects: Project[];
  categories: Category[];
  blackCode: BlackCode[];
  logo: Logo[];
}

const Experience: React.FC<ExperienceProps> = ({ projects, categories, blackCode, logo }) => {
  const experienceContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const progressRefs = useRef<Array<RefObject<HTMLDivElement>>>([]);
  const progressBarRefs = useRef<Array<RefObject<MuxPlayerElement>>>([]);
  const progressBarContainerRefs = useRef<Array<RefObject<HTMLDivElement>>>([]);
  const textCodeContainerRef = useRef<HTMLDivElement | null>(null);

  const [progresses, setProgresses] = useState<number[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isProject, setIsProject] = useState(false);
  const [isTextCode, setIsTextCode] = useState(false);
  const [isExperience, setIsExperience] = useState(false);
  const [hasTextProject, setHasTextProject] = useState(false);
  const [isLastVideoEnded, setIsLastVideoEnded] = useState(false); // Track if the last video has ended
  const [isExperienceEnd, setIsExperienceEnd] = useState(false);
  const [isDriftToHome, setIsDriftToHome] = useState(() => {
    if (typeof window !== "undefined") {
      const savedIsDriftToHome = sessionStorage.getItem("isDriftToHome");
      return savedIsDriftToHome ? JSON.parse(savedIsDriftToHome) : false;
    }
    return false;
  });
  const [isDriftToA, setIsDriftToA] = useState(() => {
    if (typeof window !== "undefined") {
      const savedIsDriftToA = sessionStorage.getItem("isDriftToA");
      return savedIsDriftToA ? JSON.parse(savedIsDriftToA) : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isDriftToHome", JSON.stringify(isDriftToHome));
    }
    if (typeof window !== "undefined") {
        sessionStorage.setItem("isDriftToA", JSON.stringify(isDriftToA));
    }
  }, [isDriftToHome, isDriftToA]);

  

  const transitionDuration = 3000; // Duration of the fade-out in milliseconds

  const router = useRouter(); // Use the useRouter hook for navigation
  const pathname = usePathname(); // Get the current path


  const { setVisibleContainers } = useVisibility();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSelectedProjects = sessionStorage.getItem("selectedProjects");
      if (savedSelectedProjects) {
        const parsedProjects = JSON.parse(savedSelectedProjects);
        setSelectedProjects(parsedProjects);
        setProgresses(new Array(parsedProjects.length).fill(0));
        setIsVisible(new Array(parsedProjects.length).fill(false));
        progressRefs.current = parsedProjects.map(() => React.createRef());
        progressBarRefs.current = parsedProjects.map(() => React.createRef());
        progressBarContainerRefs.current = parsedProjects.map(() => React.createRef());
      }
    }
  }, []);

  useEffect(() => {
    setVisibleContainers({
      textCodeContainerRef: isTextCode,
      barVideoContainerRef: isProject,
      textProjectContainerRef: hasTextProject,
    });
  }, [isTextCode, isProject, setVisibleContainers]);

  const handleTimeUpdate = (index: number) => {
    if (progressBarRefs.current[index]?.current) {
      const currentTime = progressBarRefs.current[index]!.current!.currentTime;
      const duration = progressBarRefs.current[index]!.current!.duration;
      const percentage = (currentTime / duration) * 100;

      setProgresses((prevProgresses) => {
        const newProgresses = [...prevProgresses];
        newProgresses[index] = percentage;
        return newProgresses;
      });

      // Trigger fade-out at the last few seconds
      if (duration - currentTime <= transitionDuration / 1000 && isVisible[index]) {
        setIsVisible((prevVisible) => {
          const newVisible = [...prevVisible];
          newVisible[index] = false;
          setHasTextProject(false);
          return newVisible;
        });
        setIsProject(false);
      }
    }
  };

  const handleVideoEnd = useCallback(() => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < selectedProjects.length) {
      

      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);

        // Fade in the next video and progress bar
        setTimeout(() => {
          setIsVisible((prevVisible) => {
            const newVisible = [...prevVisible];
            newVisible[nextIndex] = true;
            setIsProject(true);
            selectedProjects[nextIndex]?.text && setHasTextProject(true);
            return newVisible;
          });

          // Ensure the next video starts playing
          if (progressBarRefs.current[nextIndex]?.current) {
            progressBarRefs.current[nextIndex].current.play();
            setIsPlaying(true); // Update the play state
          }
        }, 100); // Small delay before fading in the next video
      }, transitionDuration); // Ensure this matches your fade-out transition duration
    } else {
      // When the last video ends, set isLastVideoEnded to true
      setIsLastVideoEnded(true);
    }
  }, [currentVideoIndex, selectedProjects]);

  const handleTextCodeComplete = useCallback(() => {
    setIsTextCode(false);
    setIsExperience(false);
    setIsExperienceEnd(true);
    sessionStorage.setItem('prevPathname', pathname);
    if (isDriftToHome) {
        setTimeout(() => {
            router.push("/");
        }, 3000);
    } else {
        setIsDriftToA(true);
        mapContainerRef.current!.style.visibility = "hidden";
        mapContainerRef.current!.style.opacity = "0";
        mapContainerRef.current!.style.transition = `all 3000ms ease-in-out`;

        setTimeout(() => {
            router.push("/archive"); // Redirect to the archive page
        
        }, 3000);
    }
    
  }, [router, isDriftToHome]);

  const fadeOutAndComplete = useCallback(() => {
    setIsDriftToHome(true);

    setIsVisible((prevVisible) => {
      const newVisible = [...prevVisible];
      newVisible[currentVideoIndex] = false; // Start fading out the current video
      setIsProject(false);
      setHasTextProject(false);
      return newVisible;
    });
    
  }, [currentVideoIndex, transitionDuration]);

  useEffect(() => {
    mapContainerRef.current!.style.visibility = "visible";
    mapContainerRef.current!.style.opacity = "1";
    if (selectedProjects.length > 0) {
      setHasTextProject(!!selectedProjects[0]?.text);

      setTimeout(() => {
        setIsVisible((prevVisible) => {
          const newVisible = [...prevVisible];
          newVisible[0] = true;
          return newVisible;
        });
        setIsProject(true);
        setIsTextCode(true);
        setIsExperience(true);
      }, 500); // Small delay for the initial load
    }
  }, [selectedProjects, setHasTextProject, setIsExperience]);

  const handleNavClick = (index: number) => {
    setIsVisible((prevVisible) => {
      const newVisible = [...prevVisible];
      newVisible[currentVideoIndex] = false; // Hide the current video
      setIsProject(false);
      setHasTextProject(false);
      return newVisible;
    });

    setTimeout(() => {
      setCurrentVideoIndex(index);

      if (progressBarRefs.current[index]?.current) {
        const player = progressBarRefs.current[index].current;
        player.currentTime = 0;
        player.play();
        setIsPlaying(true);
      }

      setTimeout(() => {
        setIsVisible((prevVisible) => {
          const newVisible = [...prevVisible];
          newVisible[index] = true;
          setIsProject(true);
          selectedProjects[index]?.text && setHasTextProject(true);
          return newVisible;
        });
      }, 100);
    }, transitionDuration);
  };

  const togglePlayPause = () => {
    if (progressBarRefs.current[currentVideoIndex]?.current) {
      const player = progressBarRefs.current[currentVideoIndex].current;
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <NavExperience
        logo={logo}
        selectedProjects={selectedProjects}
        currentVideoIndex={currentVideoIndex}
        setCurrentVideoIndex={handleNavClick}
        isPlaying={isPlaying}
        isExperience={isExperience}
        fadeOutAndComplete={fadeOutAndComplete} // Pass the fade-out handler
        togglePlayPause={togglePlayPause}
      />
      <Map
        mapContainerRef={mapContainerRef}
        targetRef={experienceContainerRef}
        isTransition={isExperienceEnd}
      />
      {selectedProjects.length > 0 &&
        selectedProjects.map((project, index) => (
          <div
            key={index}
            className={`h-[100vh] w-[100vw] absolute transition-opacity ease-in-out duration-md ${
              isVisible[index] ? "opacity-100" : "opacity-0"
            }`}
          >
            <MuxPlayer
              playbackId={project.video}
              autoPlay={index === currentVideoIndex}
              ref={progressBarRefs.current[index]}
              onTimeUpdate={() => handleTimeUpdate(index)}
              onLoadedMetadata={() => handleTimeUpdate(index)}
              onEnded={index === currentVideoIndex ? handleVideoEnd : undefined}
              className="h-full w-full"
            />
          </div>
        ))}
      <div
        ref={experienceContainerRef}
        className="grid grid-cols-5 grid-rows-4 gap-lg p-lg h-[100vh] w-[100vw] absolute"
      >
        <TextCode
          textCodeContainerRef={textCodeContainerRef}
          blackCode={blackCode}
          speed={150}
          onComplete={isLastVideoEnded || isDriftToHome ? handleTextCodeComplete : undefined} // Pass the callback to the TextCode component
        />
        {selectedProjects.length > 0 &&
          selectedProjects.map((project, index) => (
            <BarVideo
              key={index}
              src={project.video}
              title={project.title}
              name={project.name}
              progressRef={progressRefs.current[index]}
              progressBarRef={progressBarRefs.current[index]}
              progressBarContainerRef={progressBarContainerRefs.current[index]}
              progress={progresses[index]}
              setProgress={(value: SetStateAction<number>) =>
                setProgresses((prev) => {
                  const newProgresses = [...prev];
                  newProgresses[index] =
                    typeof value === "function" ? value(newProgresses[index]) : value;
                  return newProgresses;
                })
              }
              isVisible={isVisible[index]}
            />
          ))}
        {selectedProjects.length > 0 &&
          selectedProjects.map(
            (project, index) =>
              project.text && (
                <TextProject
                  key={index}
                  text={project.text}
                  speed={150}
                  isVisible={isVisible[index]}
                />
              )
          )}
      </div>
    </div>
  );
};

export default Experience;
