"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import NavHome from "./nav-home";

import { Project } from "@/types/Project";
import { Category } from "@/types/Category";
import { Logo } from "@/types/Logo";
import Link from "next/link";
import Image from "next/image";
import WatchedOrb from "./watched-orb";
import { usePathname, useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { useTransition } from "../_hooks/transition-context";

// Define AnimationClass type
type AnimationClass = "up-down-one" | "up-down-two" | "up-down-three";

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

const ArchiveContainer: React.FC<{
    projects: Project[];
    categories: Category[];
    logo: Logo[];
  }> = ({ projects, categories, logo }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEighteen, setIsEighteen] = useState(false);
    const [isExperienceEnd, setIsExperienceEnd] = useState(false);


    useEffect(() => {
      if (typeof window !== "undefined") {
        const savedIsSubmitted = sessionStorage.getItem("isSubmitted");
        if (savedIsSubmitted) {
          setIsSubmitted(JSON.parse(savedIsSubmitted));
        }
        const savedIsEighteen = sessionStorage.getItem("isEighteen");
          if (savedIsEighteen) {
            setIsEighteen(JSON.parse(savedIsEighteen));
          }
        const savedIsExperienceEnd = sessionStorage.getItem("isExperienceEnd");
        if (savedIsExperienceEnd) {
            setIsExperienceEnd(JSON.parse(savedIsExperienceEnd));
        }
      }
    }, []);

   
    // Refs for the various containers
    const logoRef = useRef<HTMLImageElement | null>(null);
    const navHomeContainerRef = useRef<HTMLDivElement | null>(null);
    const archiveButtonRef = useRef<HTMLDivElement | null>(null);

    const orbContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the parent scroll container
    const archiveContainerRef = useRef<HTMLDivElement | null>(null);


    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  
    const [isSelected, setIsSelected] = useState(false);
    const [prevOrbIndex, setPrevOrbIndex] = useState(0);
    const isProgrammaticScroll = useRef(false); // Flag to detect programmatic scrolling
  
    const [activeImageIndex, setActiveImageIndex] = useState(0); // State for active image in the slideshow
    const [isSlideshowRunning, setIsSlideshowRunning] = useState(true); // State to control the slideshow
    const [isFading, setIsFading] = useState(false); // State for fade transitions
  
    const [containerSize, setContainerSize] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });
    const [positions, setPositions] = useState<Position[]>([]);
  
    const animationClasses = useRef<AnimationClass[]>([]); // Ensure typing is correct
  
    const orbRefs = useMemo(
      () => selectedProjects.map(() => React.createRef<HTMLDivElement>()),
      [selectedProjects]
    );
  
    const selectedProjectRefs = useMemo(
      () =>
        projects
          .filter((project) =>
            filteredProjects.some(
              (filteredProject) => filteredProject.title === project.title
            )
          )
          .map(() => React.createRef<HTMLDivElement>()),
      [projects, filteredProjects]
    );

    

    const [isNavClicked, setIsNavClicked] = useState(false);

    const [isAToHome, setIsAToHome] = useState(() => {
        if (typeof window !== "undefined") {
          const savedIsAToHome = sessionStorage.getItem("isAToHome");
          return savedIsAToHome ? JSON.parse(savedIsAToHome) : false;
        }
        return false;
      });
    
      useEffect(() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("isAToHome", JSON.stringify(isAToHome));
        }
      }, [isAToHome]);

    const [isDriftToA, setIsDriftToA] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // Get the current path
    const fadeDuration = 3000;
  
    useEffect(() => {
        setIsAToHome(true);
        sessionStorage.setItem('isAToHome', JSON.stringify(true));

        const savedIsDriftToA = sessionStorage.getItem("isDriftToA");
        if (savedIsDriftToA) {
            setIsDriftToA(JSON.parse(savedIsDriftToA));
              }
        
        const handleRouteChange = (url: string) => {
            if (savedIsDriftToA === 'true') {
              setTimeout(() => {
              handleVisible([navHomeContainerRef, logoRef, archiveContainerRef]);
              setIsDriftToA(false)
              sessionStorage.setItem('isDriftToA', JSON.stringify(false));
            }, fadeDuration);
   
            } else {
              setNoBlur([archiveButtonRef]);
              setVisible([navHomeContainerRef, logoRef]);
              setTimeout(() => {
              handleVisible([archiveContainerRef]);
            }, fadeDuration);
            }
        }
    
        if (isNavClicked) {
            handleVisible([navHomeContainerRef, logoRef]);
          handleInvisible([archiveContainerRef]);
        };
    
        // Initial check on mount
        handleRouteChange(pathname);

        if (savedIsDriftToA === 'true') {
              return () => {
                setInvisible([navHomeContainerRef, archiveContainerRef]);
                setNoBlur([archiveButtonRef]);
              };
        } else {
            return () => {
                setInvisible([archiveContainerRef]);
                setVisible([navHomeContainerRef]);
                setNoBlur([archiveButtonRef]);
            };
        }
          
        
    }, [pathname, isDriftToA, isNavClicked ]);

    const handleVisible = (refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]) => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.visibility = "visible";
            ref.current!.style.opacity = "1";
            ref.current!.style.transition = `all ${fadeDuration}ms ease-in-out`;
          }
        });
      };
    
      const handleInvisible = (refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]) => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.opacity = "0";
            ref.current!.style.transition = `all ${fadeDuration}ms ease-in-out`;
            ref.current!.style.visibility = "hidden";
          }
        });
      };
    
      const setInvisible = (refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]) => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.opacity = "0";
            ref.current!.style.visibility = "hidden";
          }
        });
      };
    
      const setVisible = (refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]) => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.opacity = "1";
            ref.current!.style.visibility = "visible";
          }
        });
      };

      const handleNoBlur = (refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]) => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.filter = "blur(0px)";
            ref.current!.style.transition = `filter ${fadeDuration}ms ease-in-out ${fadeDuration}ms`;
          }
        });
      };
    
      const setBlur = (refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]) => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.filter = "blur(8px)";
          }
        });
      };
    
      const setNoBlur = (refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]) => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current!.style.filter = "blur(0px)";
          }
        });
      };


    useEffect(() => {
      if (typeof window !== "undefined") {
        const savedFilteredProjects = sessionStorage.getItem("filteredProjects");
  
        if (savedFilteredProjects) {
          setFilteredProjects(JSON.parse(savedFilteredProjects));
        }
        const savedSelectedProjects = sessionStorage.getItem("selectedProjects");
  
        if (savedSelectedProjects) {
          setSelectedProjects(JSON.parse(savedSelectedProjects));
        }
      }
    }, []);


    // Function to calculate positions based on the current container size
    const calculatePositions = useCallback(() => {
      const orbWidth = 24;
      const orbHeight = 24;
      const newPositions: Position[] = [];
  
      selectedProjects.forEach((_, index) => {
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
    }, [containerSize, selectedProjects]);

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
  }, [containerSize, selectedProjects, calculatePositions]);

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
      animationClasses.current = selectedProjects.map(
        () => classes[Math.floor(Math.random() * classes.length)]
      );
    }, [selectedProjects]);
  
    // Slideshow effect
    useEffect(() => {
      if (isSlideshowRunning) {
        const interval = setInterval(() => {
          setIsFading(true);
          setTimeout(() => {
            setActiveImageIndex((prevIndex) =>
              prevIndex === selectedProjects.length - 1 ? 0 : prevIndex + 1
            );
            setIsFading(false);
          }, 3000); // Duration of the fade transition
        }, 9000); // 6000ms visible + 3000ms transition
  
        return () => clearInterval(interval);
      }
    }, [isSlideshowRunning, selectedProjects.length]);
  
    const handleWatchedOrb = useCallback(
      (orbIndex: number) => {
        const stickyContainerHeight = 40; // Adjust this value to match the height of your sticky container
  
        setIsSlideshowRunning(false); // Stop the slideshow
  
        // if (orbIndex === prevOrbIndex) {
        //   // Toggle the state of the same orb and project
        //   setIsSelected(!isSelected);
        //   orbRefs[orbIndex].current!.style.backgroundColor = isSelected
        //     ? "#000000"
        //     : "#FFFFFF";
        //   orbRefs[orbIndex].current!.style.color = isSelected
        //     ? "#FFFFFF"
        //     : "#000000";
        // orbRefs[orbIndex].current!.style.boxShadow = isSelected
        //     ? "none"
        //     : "0px 0px 6px 3px #FFFFFF";
        //   selectedProjectRefs[orbIndex].current!.style.textShadow = isSelected
        //     ? "none"
        //     : "0px 0px 1px #FFFFFF, 0px 0px 2px #FFFFFF, 0px 0px 3px #FFFFFF, 0px 0px 6px #FFFFFF";
        // } else {
          // Deselect the previous orb and project
          orbRefs[prevOrbIndex].current!.style.backgroundColor = "#000000";
          orbRefs[prevOrbIndex].current!.style.color = "#FFFFFF";
        //   orbRefs[prevOrbIndex].current!.style.boxShadow = "none";
          selectedProjectRefs[prevOrbIndex].current!.style.textShadow = "none";
  
          // Select the new orb and project
          setIsSelected(true);
          setPrevOrbIndex(orbIndex);
          orbRefs[orbIndex].current!.style.backgroundColor = "#FFFFFF";
          orbRefs[orbIndex].current!.style.color = "#000000";
        //   orbRefs[orbIndex].current!.style.boxShadow = "0px 0px 6px 3px #FFFFFF";
          selectedProjectRefs[orbIndex].current!.style.textShadow =
            "0px 0px 1px #FFFFFF, 0px 0px 2px #FFFFFF, 0px 0px 3px #FFFFFF, 0px 0px 6px #FFFFFF";
        // }
        // if (orbIndex !== prevOrbIndex) {
        setIsFading(true);
        setTimeout(() => {
          setActiveImageIndex(orbIndex);
          setIsFading(false);
        }, 3000);
        // }

        // Set the flag before programmatic scroll
        isProgrammaticScroll.current = true;
  
        // Scroll to the selected project ref and adjust for sticky header
        const projectElement = selectedProjectRefs[orbIndex].current;
        if (projectElement) {
          const scrollContainer = scrollContainerRef.current;
  
          if (scrollContainer) {
            const elementTop = projectElement.offsetTop;
            const scrollPosition = elementTop - stickyContainerHeight;
  
            // Perform scroll and reset the flag after a delay
            scrollContainer.scrollTo({
              top: scrollPosition,
              behavior: "smooth",
            });
  
            // Ensure the flag is reset only after the scroll finishes
            setTimeout(() => {
              isProgrammaticScroll.current = false;
            }, 1000); // Adjust based on the scroll duration
          }
        }
      },
      [prevOrbIndex, orbRefs, selectedProjectRefs]
    );
  
    useEffect(() => {
      const handleScroll = () => {
        if (isProgrammaticScroll.current) return; // Ignore programmatic scrolls
  
        if (isSelected) {
          setIsSelected(false);
          orbRefs[prevOrbIndex].current!.style.backgroundColor = "#000000";
          orbRefs[prevOrbIndex].current!.style.color = "#FFFFFF";
          orbRefs[prevOrbIndex].current!.style.boxShadow = "none";
          selectedProjectRefs[prevOrbIndex].current!.style.textShadow = "none";
  
          setIsSlideshowRunning(true); // Resume the slideshow on scroll
        }
      };
  
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleScroll);
      }
  
      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener("scroll", handleScroll);
        }
      };
    }, [isSelected, prevOrbIndex, orbRefs, selectedProjectRefs]);
  
    return (
        <div>
        <NavHome
          logoRef={logoRef}
          navHomeContainerRef={navHomeContainerRef}
          archiveButtonRef={archiveButtonRef}
          isSubmitted={isSubmitted}
          logo={logo}
          isEighteen={isEighteen}
          setIsNavClicked={setIsNavClicked}
        />
      <div ref={archiveContainerRef} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 grid-rows-4 gap-lg p-lg h-[100vh] w-[100vw] absolute transition-opacity ease-in-out duration-md opacity-0">
        
        <div  className="row-start-4 row-span-1 md:row-start-2 md:row-span-2 col-start-1 col-span-1 border border-white rounded p-md flex flex-col gap-md">
          <div className="font-body text-sm text-white">Watched</div>
          <div ref={orbContainerRef} className="relative h-full">
            {positions.map((position, index) => (
              <WatchedOrb
                key={index}
                position={position}
                number={(index + 1).toString()}
                orbRef={orbRefs[index]}
                onClick={() => handleWatchedOrb(index)}
                animationClass={animationClasses.current[index]}
                isSelected={prevOrbIndex === index && isSelected}
                isExperienceEnd={isExperienceEnd}
              />
            ))}
          </div>
        </div>
        <div className="hidden md:block row-start-4 row-span-1 col-start-1 border border-white rounded relative">
          {selectedProjects.map((project, index) => (
            <Image
              key={index}
              src={project.image}
              width={500}
              height={500}
              className={`h-full w-auto absolute transition-opacity ease-in-out duration-md object-cover ${
                index === activeImageIndex
                  ? isFading
                    ? "opacity-0"
                    : "opacity-100"
                  : "opacity-0"
              } ${isExperienceEnd ? "" : "blur"}`}
              alt={project.title}
            />
          ))}
        </div>
        <div
          ref={scrollContainerRef}
          className="row-start-2 row-span-2 md:row-start-2 md:row-span-3 col-start-1 col-span-1 md:col-start-2 md:col-span-2 xl:col-start-2 xl:col-span-4 border border-white rounded px-md pb-md flex flex-col relative overflow-y-scroll h-full"
        >
          <div className="font-body text-sm text-white flex gap-lg sticky top-[0px] bg-black py-md z-10">
            <div className="w-1/2">Title</div>
            <div className="w-1/4">Artist</div>
            <div className="w-1/4">Year</div>
          </div>
         
          {projects.map((project, index) => {
            const isFiltered = filteredProjects.some(
              (filteredProject) => filteredProject.title === project.title
            );
          
            // Find the matching index in selectedProjects
            const selectedProjectIndex = selectedProjects.findIndex(
              (selectedProject) => selectedProject.title === project.title
            );
          
            // If the project is in selectedProjects, use its ref
            const projectRef = selectedProjectIndex !== -1 ? selectedProjectRefs[selectedProjectIndex] : null;
            return (
              <div
                key={index}
                ref={projectRef} // This will apply to projects in selectedProjects
                className={`font-serif text-md text-white flex gap-lg pb-md last:pb-[0px] ${
                  isFiltered ? "" : "blur"
                }`}
                style={{
                  transition: "text-shadow 3000ms ease-in-out",
                }}
              >
                <div className="w-1/2">{project.title}</div>
                <div className="w-1/4">{project.name}</div>
                {project.year && <div className="w-1/4">{project.year.slice(0, 4)}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    );
  };
  
  export default ArchiveContainer;
  