"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  VisibilityProvider,
  useVisibility,
} from "../_hooks/visibility-context";
import Typewriter from "./typewriter";
import Map from "./map";
import NavHome from "./nav-home";
import Questions from "./questions";
import DriftMarquee from "./drift-marquee";
import BarAudio from "./bar-audio";
import AgeVerification from "./age-verification";
import LogoAnimation from "./logo-animation";
import { Project } from "@/types/Project";
import { Category } from "@/types/Category";
import { IntroText } from "@/types/IntroText";
import { IntroAudio } from "@/types/IntroAudio";
import { Background } from "@/types/Background";
import { Logo } from "@/types/Logo";
import MuxPlayer from "@mux/mux-player-react";
import { usePathname, useRouter } from "next/navigation";

const Intro: React.FC<{
  projects: Project[];
  categories: Category[];
  introText: IntroText[];
  introAudio: IntroAudio[];
  background: Background[];
  logo: Logo[];
}> = ({ projects, categories, introText, introAudio, background, logo }) => {
  const [isEighteen, setIsEighteen] = useState(() => {
    if (typeof window !== "undefined") {
      const savedIsEighteen = sessionStorage.getItem("isEighteen");
      return savedIsEighteen ? JSON.parse(savedIsEighteen) : false;
    }
    return false;
  });
  const [isSubmitted, setIsSubmitted] = useState(() => {
    if (typeof window !== "undefined") {
      const savedIsSubmitted = sessionStorage.getItem("isSubmitted");
      return savedIsSubmitted ? JSON.parse(savedIsSubmitted) : false;
    }
    return false;
  });
  const [isAudio, setIsAudio] = useState(() => {
    if (typeof window !== "undefined") {
      const savedIsAudio = sessionStorage.getItem("isAudio");
      return savedIsAudio ? JSON.parse(savedIsAudio) : false;
    }
    return false;
  });
  const [progress, setProgress] = useState(() => {
    if (typeof window !== "undefined") {
      // Parse the stored progress value as an integer, or default to 0
      const savedProgress = sessionStorage.getItem("progress");
      return savedProgress !== null ? JSON.parse(savedProgress) : 0;
    }
  });
  const [isQuestions, setIsQuestions] = useState(false);
  const [isQuestionsEnd, setIsQuestionsEnd] = useState(false);

  const [isDrift, setIsDrift] = useState(false);

  // Save `isSubmitted` to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isSubmitted", JSON.stringify(isSubmitted));
      sessionStorage.setItem("isEighteen", JSON.stringify(isEighteen));
      sessionStorage.setItem("isAudio", JSON.stringify(isAudio));
      sessionStorage.setItem("progress", JSON.stringify(progress));
    }
  }, [isSubmitted, isEighteen, isAudio, progress]);

  const { setVisibleContainers } = useVisibility(); // Use context to manage visibility

  // Ref for the Intro container
  const introContainerRef = useRef<HTMLDivElement>(null);

  // Refs for the various containers
  const ageContainerRef = useRef<HTMLDivElement>(null);
  const logoAnimationContainerRef = useRef<HTMLDivElement>(null);
  const backgroundContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const navHomeContainerRef = useRef<HTMLDivElement | null>(null);
  const archiveButtonRef = useRef<HTMLDivElement | null>(null);
  const textIntroContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLAudioElement>(null);
  const progressBarContainerRef = useRef<HTMLDivElement | null>(null);
  const driftContainerRef = useRef<HTMLDivElement | null>(null);
  const completedContainerRef = useRef<HTMLDivElement | null>(null);
  const completedMobileContainerRef = useRef<HTMLDivElement | null>(null);
  const orbContainerRef = useRef<HTMLDivElement | null>(null);
  const questionsContainerRef = useRef<HTMLDivElement | null>(null);

  const fadeDuration = 3000;
  const pathname = usePathname(); // Get the current path
  const [isNavClicked, setIsNavClicked] = useState(false);
  const [isDriftToHome, setIsDriftToHome] = useState(false);

  // Controls for visibility within map
  useEffect(() => {
    const savedIsDriftToHome = sessionStorage.getItem("isDriftToHome");
    if (savedIsDriftToHome) {
      setIsDriftToHome(JSON.parse(savedIsDriftToHome));
    }

    if (!isSubmitted) {
      setVisibleContainers({
        textIntroContainerRef: isEighteen && !isDrift,
        progressBarContainerRef: 0 < progress && progress < 100,
        driftContainerRef: isEighteen && !isDrift,
        completedContainerRef: isAudio,
        completedMobileContainerRef: isAudio,
        orbContainerRef: isQuestionsEnd,
        questionsContainerRef: isQuestions,
      });
    } else if (savedIsDriftToHome === "true") {
      setTimeout(() => {
        setVisibleContainers({
          textIntroContainerRef: !isDrift,
          progressBarContainerRef: false,
          driftContainerRef: !isDrift,
          completedContainerRef: false,
          completedMobileContainerRef: false,
          orbContainerRef: false,
          questionsContainerRef: false,
        });
      }, fadeDuration);
    } else {
      setVisibleContainers({
        textIntroContainerRef: !isDrift,
        progressBarContainerRef: false,
        driftContainerRef: !isDrift,
        completedContainerRef: false,
        completedMobileContainerRef: false,
        orbContainerRef: false,
        questionsContainerRef: false,
      });
    }
  }, [
    isSubmitted,
    isEighteen,
    isDrift,
    progress,
    isAudio,
    isQuestions,
    isQuestionsEnd,
    isDriftToHome,
    setVisibleContainers,
  ]);

  useEffect(() => {
    const savedIsAToHome = sessionStorage.getItem("isAToHome");
    const savedIsDriftToHome = sessionStorage.getItem("isDriftToHome");

    if (savedIsDriftToHome) {
      setIsDriftToHome(JSON.parse(savedIsDriftToHome));
    }

    const handleRouteChange = (url: string) => {
      if (isSubmitted) {
        if (savedIsDriftToHome === "true") {
          // Navigating from or to experience page
          setTimeout(() => {
            handleVisible([
              navHomeContainerRef,
              logoRef,
              mapContainerRef,
              backgroundContainerRef,
              textIntroContainerRef,
              driftContainerRef,
            ]);
            setIsDriftToHome(false);
            sessionStorage.setItem("isDriftToHome", JSON.stringify(false));
          }, fadeDuration);
        } else if (savedIsAToHome === "true") {
          setTimeout(() => {
            handleVisible([
              navHomeContainerRef,
              logoRef,
              mapContainerRef,
              backgroundContainerRef,
              textIntroContainerRef,
              driftContainerRef,
            ]);
            sessionStorage.setItem("isAToHome", JSON.stringify(false));
          }, fadeDuration);
        } else {
          handleNoBlur([archiveButtonRef]);
          setTimeout(() => {
            // handleVisible([navHomeContainerRef, logoRef, mapContainerRef, backgroundContainerRef, textIntroContainerRef, driftContainerRef]);
            sessionStorage.setItem("isAToHome", JSON.stringify(false));
          }, fadeDuration);
        }
      } else if (isAudio) {
        setIsQuestionsEnd(true);
        setTimeout(() => {
          handleVisible([
            navHomeContainerRef,
            logoRef,
            mapContainerRef,
            driftContainerRef,
            backgroundContainerRef,
            textIntroContainerRef,
            completedContainerRef,
            completedMobileContainerRef,
            orbContainerRef,
          ]);
          sessionStorage.setItem("isAToHome", JSON.stringify(false));
        }, fadeDuration);
      } else if (isEighteen) {
        setTimeout(() => {
          handleVisible([
            navHomeContainerRef,
            logoRef,
            mapContainerRef,
            progressBarContainerRef,
            driftContainerRef,
            backgroundContainerRef,
            textIntroContainerRef,
          ]);
          if (progressBarRef.current) {
            progressBarRef.current.play();
          }
          sessionStorage.setItem("isAToHome", JSON.stringify(false));
        }, fadeDuration);
      } else {
        setVisible([textIntroContainerRef, ageContainerRef, logoAnimationContainerRef]);
        setInvisible([backgroundContainerRef]);

      }
    };

    if (isNavClicked) {
      handleInvisible([
        mapContainerRef,
        driftContainerRef,
        backgroundContainerRef,
        textIntroContainerRef,
        progressBarContainerRef,
        completedContainerRef,
        completedMobileContainerRef,
        orbContainerRef,
        questionsContainerRef,
      ]);
    }

    if (isEighteen) {
      handleInvisible([ageContainerRef, logoAnimationContainerRef]);
    }

    if (isAudio) {
      handleInvisible([progressBarContainerRef]);
    }

    if (isSubmitted) {
      handleUnhidden([driftContainerRef]);
      handleInvisible([orbContainerRef]);
      setTimeout(() => {
        handleInvisible([completedContainerRef, completedMobileContainerRef]);
        handleVisible([driftContainerRef]);
        handleNoBlur([archiveButtonRef]);
      }, 3000);
    }

    if (isDrift) {
      handleInvisible([
        navHomeContainerRef,
        driftContainerRef,
        backgroundContainerRef,
        textIntroContainerRef,
      ]);
    }

    // Initial check on mount
    handleRouteChange(pathname);

    if (savedIsAToHome === "true" || savedIsDriftToHome === "true") {
      if (isSubmitted) {
        if (savedIsDriftToHome === "true") {
          return () => {
            handleUnhidden([driftContainerRef]);
            setInvisible([
              navHomeContainerRef,
              driftContainerRef,
              backgroundContainerRef,
              textIntroContainerRef,
            ]);
            setVisible([mapContainerRef]);
            setNoBlur([archiveButtonRef]);
          };
        } else {
          return () => {
            handleUnhidden([driftContainerRef]);
            setInvisible([
              mapContainerRef,
              driftContainerRef,
              backgroundContainerRef,
              textIntroContainerRef,
            ]);
            setVisible([navHomeContainerRef]);
            setNoBlur([archiveButtonRef]);
          };
        }
      } else if (isAudio) {
        return () => {
          setInvisible([
            mapContainerRef,
            driftContainerRef,
            backgroundContainerRef,
            textIntroContainerRef,
            completedContainerRef,
            completedMobileContainerRef,
            orbContainerRef,
          ]);
          setVisible([navHomeContainerRef]);
        };
      } else if (isEighteen) {
        return () => {
          setInvisible([
            mapContainerRef,
            driftContainerRef,
            backgroundContainerRef,
            textIntroContainerRef,
            progressBarContainerRef,
          ]);
          setVisible([navHomeContainerRef]);
        };
      } else {
        return () => {
          setInvisible([
            navHomeContainerRef,
            logoRef,
            mapContainerRef,
            driftContainerRef,
            backgroundContainerRef,
          ]);
        };
      }
    } else {
      if (isSubmitted) {
        if (isDriftToHome) {
          return () => {
            handleUnhidden([driftContainerRef]);
            handleInvisible([progressBarContainerRef, orbContainerRef]);
            setNoBlur([archiveButtonRef]);
          };
        } else {
          return () => {
            handleUnhidden([driftContainerRef]);
            handleInvisible([progressBarContainerRef, orbContainerRef]);
            setVisible([
              navHomeContainerRef,
              logoRef,
              mapContainerRef,
              driftContainerRef,
              backgroundContainerRef,
              textIntroContainerRef,
            ]);
            setBlur([archiveButtonRef]);
          };
        }
      } else if (isAudio) {
        return () => {
          handleInvisible([progressBarContainerRef]);
          setInvisible([
            completedContainerRef,
            completedMobileContainerRef,
            orbContainerRef,
          ]);
          setVisible([
            navHomeContainerRef,
            logoRef,
            mapContainerRef,
            driftContainerRef,
            backgroundContainerRef,
            textIntroContainerRef,
          ]);
        };
      } else if (isEighteen) {
        return () => {
          handleInvisible([ageContainerRef, logoAnimationContainerRef]);
          setVisible([
            navHomeContainerRef,
            logoRef,
            mapContainerRef,
            driftContainerRef,
            backgroundContainerRef,
            textIntroContainerRef,
            progressBarContainerRef,
          ]);
        };
      } else {
        return () => {
          setVisible([ageContainerRef, logoAnimationContainerRef]);
          setInvisible([
            navHomeContainerRef,
            logoRef,
            mapContainerRef,
            driftContainerRef,
            backgroundContainerRef,
          ]);
        };
      }
    }
  }, [
    pathname,
    isEighteen,
    isAudio,
    isSubmitted,
    isDrift,
    isDriftToHome,
    isNavClicked,
    progressBarRef,
  ]);

  useEffect(() => {
    if (progress === 100) {
      setIsAudio(true);
    }

    if (isQuestions) {
      handleVisible([questionsContainerRef]);
    } else {
      handleInvisible([questionsContainerRef]);
    }
  }, [progress, isQuestions, isSubmitted]);

  const handleUnhidden = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.display = "block";
      }
    });
  };

  const handleVisible = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.visibility = "visible";
        ref.current!.style.opacity = "1";
        ref.current!.style.transition = `all ${fadeDuration}ms ease-in-out`;
      }
    });
  };

  const handleInvisible = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.opacity = "0";
        ref.current!.style.transition = `all ${fadeDuration}ms ease-in-out`;
        ref.current!.style.visibility = "hidden";
      }
    });
  };

  const setInvisible = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.opacity = "0";
        ref.current!.style.visibility = "hidden";
      }
    });
  };

  const setVisible = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.opacity = "1";
        ref.current!.style.visibility = "visible";
      }
    });
  };

  const handleNoBlur = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.filter = "blur(0px)";
        ref.current!.style.transition = `filter ${fadeDuration}ms ease-in-out ${fadeDuration}ms`;
      }
    });
  };

  const setBlur = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.filter = "blur(8px)";
      }
    });
  };

  const setNoBlur = (
    refs: React.RefObject<HTMLDivElement | HTMLImageElement>[]
  ) => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current!.style.filter = "blur(0px)";
      }
    });
  };

  console.log(
    "isEighteen:",
    isEighteen,
    "isAudio:",
    isAudio,
    "progress:",
    progress,
    "isSubmitted:",
    isSubmitted
  );

  return (
    <div>
      <div ref={backgroundContainerRef} className="invisible">
        <MuxPlayer
          playbackId={background[0].video}
          muted
          autoPlay
          loop
          className="h-[100vh] w-[100vw] absolute"
        />
      </div>
      <NavHome
        logoRef={logoRef}
        navHomeContainerRef={navHomeContainerRef}
        archiveButtonRef={archiveButtonRef}
        isSubmitted={isSubmitted}
        logo={logo}
        isEighteen={isEighteen}
        setIsNavClicked={setIsNavClicked}
      />
      <Map
        mapContainerRef={mapContainerRef}
        targetRef={introContainerRef}
        isTransition={isEighteen}
      />
      <div
        ref={introContainerRef}
        className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 grid-rows-4 gap-lg p-lg h-[100vh] w-[100vw] absolute transition-opacity ease-in-out duration-md opacity-100"
      >
        <LogoAnimation
          isEighteen={isEighteen}
          isDrift={isDrift}
          logo={logo}
          logoAnimationContainerRef={logoAnimationContainerRef}
        />
        <div
          ref={textIntroContainerRef}
          className="row-start-1 col-start-1 md:col-start-2 xl:col-start-3 flex flex-col gap-lg transition-all ease-in-out duration-md invisible"
        >
          <div
            className={`font-serif font-bold text-lg text-white flex justify-center ${isEighteen && "opacity-0 md:opacity-100 transition-opacity ease-in-out duration-md"}`}
          >
            <div>MAROON/</div>
            <div className="scale-x-[-1]">s</div>
          </div>
          <Typewriter text={introText[0].description} speed={150} />
        </div>

        <Questions
          completedContainerRef={completedContainerRef}
          completedMobileContainerRef={completedMobileContainerRef}
          orbContainerRef={orbContainerRef}
          questionsContainerRef={questionsContainerRef}
          categories={categories}
          projects={projects}
          setIsSubmitted={setIsSubmitted}
          setIsQuestions={setIsQuestions}
          setIsQuestionsEnd={setIsQuestionsEnd}
        />

        <DriftMarquee
          driftContainerRef={driftContainerRef}
          targetRef={introContainerRef}
          isEighteen={isEighteen}
          isSubmitted={isSubmitted}
          setIsDrift={setIsDrift}
        />

        <BarAudio
          src={introAudio[0].audio}
          title={introAudio[0].title}
          name={introAudio[0].name}
          progressBarRef={progressBarRef}
          progressBarContainerRef={progressBarContainerRef}
          progress={progress}
          setProgress={setProgress}
        />

        <div className="row-start-4 col-start-1 md:col-start-2 xl:col-start-3 content-end">
          <AgeVerification
            setIsEighteen={setIsEighteen}
            isEighteen={isEighteen}
            ageContainerRef={ageContainerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
