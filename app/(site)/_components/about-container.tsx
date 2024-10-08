"use client";
import React, { useEffect, useState, useRef } from "react";
import Typewriter from "./typewriter";
import NavHome from "./nav-home";

import { Project } from "@/types/Project";
import { Category } from "@/types/Category";
import { IntroText } from "@/types/IntroText";
import { IntroAudio } from "@/types/IntroAudio";
import { Background } from "@/types/Background";
import { Logo } from "@/types/Logo";
import { Position } from "@/types/Position";
import Link from "next/link";
import TextAbout from "./text-about";
import { AboutText } from "@/types/AboutText";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "../_hooks/transition-context";

const AboutContainer: React.FC<{
  projects: Project[];
  categories: Category[];
  introText: IntroText[];
  introAudio: IntroAudio[];
  background: Background[];
  logo: Logo[];
  positions: Position[];
  aboutText: AboutText[];
}> = ({
  projects,
  categories,
  introText,
  introAudio,
  background,
  logo,
  positions,
  aboutText
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEighteen, setIsEighteen] = useState(false);


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
      }
    }, []);

  // Ref for the About container
  const aboutContainerRef = useRef<HTMLDivElement | null>(null);

  // Refs for the various containers
  const logoRef = useRef<HTMLImageElement | null>(null);
  const navHomeContainerRef = useRef<HTMLDivElement | null>(null);
  const archiveButtonRef = useRef<HTMLDivElement | null>(null);


  const { isTransitioning, setTransitioning } = useTransition();
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

    const router = useRouter();
    const pathname = usePathname(); // Get the current path
    const fadeDuration = 3000;
  
    useEffect(() => {
      const savedIsSubmitted = sessionStorage.getItem("isSubmitted");
      if (savedIsSubmitted) {
              setIsSubmitted(JSON.parse(savedIsSubmitted));
            }
  

      setIsAToHome(true);
      sessionStorage.setItem('isAToHome', JSON.stringify(true));

        const handleRouteChange = (url: string) => {
          setVisible([navHomeContainerRef]);
              setTimeout(() => {
              handleVisible([navHomeContainerRef, logoRef, aboutContainerRef]);
            }, fadeDuration);
        }
    
        if (isNavClicked) {
          handleVisible([navHomeContainerRef, logoRef]);
          handleInvisible([aboutContainerRef]);
        };
    
        // Initial check on mount
        handleRouteChange(pathname);

        if (savedIsSubmitted) {
            return () => {
                setInvisible([aboutContainerRef]);
                setVisible([navHomeContainerRef]);
                setNoBlur([archiveButtonRef]);
            };
          } else {
            return () => {
              setInvisible([aboutContainerRef]);
              setVisible([navHomeContainerRef]);
              setBlur([archiveButtonRef]);

          };
          }
          
        
    }, [pathname, isNavClicked ]);

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
  <div ref={aboutContainerRef} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 grid-rows-4 gap-lg p-lg h-[100vh] w-[100vw] absolute transition-all ease-in-out duration-md opacity-0">
       
      <div className="row-start-4 row-span-1 md:row-start-2 md:row-span-3 col-start-1 border border-white rounded flex flex-col gap-lg p-md overflow-scroll">
        {positions.map((position, index) => (
          <div key={index} className="flex flex-col gap-md">
            <div className="font-body text-sm text-white">{position.title}</div>
            <div className="font-serif text-md text-white">
              {position.people.map((person, index) =>
                person.website ? (
                  <Link
                    key={index}
                    href={person.website}
                    className="transition-all ease-in-out duration-sm cursor-pointer hover:text-shadow-glow"
                  >
                    {person.name}
                  </Link>
                ) : (
                  <div key={index}>
                    {person.name}
                    <br></br>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div
      className="row-start-2 row-span-2 md:row-start-2 md:row-span-3 col-start-1 col-span-1 md:col-start-2 md:col-span-2 xl:col-start-2 xl:col-span-4 border border-white rounded flex flex-col gap-md p-md overflow-scroll"
    >
      <div className="font-body text-sm text-white">Info</div>
      <div className="relative flex">
        <div className="font-body text-sm text-white">
          {aboutText[0].description}

          <span className="inline-block w-[6px] h-[12px] bg-white animate-caret ml-1"></span>
        </div>
      </div>
    </div>
      {/* <TextAbout text={aboutText[0].description} speed={150}></TextAbout> */}
    </div>
    </div>
  );
};

export default AboutContainer;
