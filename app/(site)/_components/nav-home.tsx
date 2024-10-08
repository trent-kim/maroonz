"use client";

import { Logo } from "@/types/Logo";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useTransition } from "../_hooks/transition-context";

const NavHome: React.FC<{
  logoRef: React.RefObject<HTMLImageElement>;
  navHomeContainerRef: React.RefObject<HTMLDivElement>;
  archiveButtonRef: React.RefObject<HTMLDivElement>;
  isSubmitted: boolean;
  logo: Logo[];
  isEighteen: boolean;
  setIsNavClicked: Dispatch<SetStateAction<boolean>>;
}> = ({
  logoRef,
  navHomeContainerRef,
  archiveButtonRef,
  isSubmitted,
  logo,
  isEighteen,
  setIsNavClicked,
}) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { isTransitioning, setTransitioning } = useTransition();
  const fadeDuration = 3000;

  const handleNavigation = (url: string) => {
    if (!isTransitioning && pathname !== url) {
      setTransitioning(true);
      setIsNavClicked(true);

      // Delay navigation until the fade out completes
      setTimeout(() => {
        router.push(url);
        setTransitioning(false); // Reset the transition state after navigation
      }, fadeDuration);
    }
  };

  return (
    <div className="absolute top-lg left-lg z-20 w-[calc(100%-48px)] md:w-auto">
      <div className="flex gap-lg items-center">
        <Image
          ref={logoRef}
          src={logo[0].image}
          width={58}
          height={58}
          onClick={() => handleNavigation("/")}
          className={`cursor-pointer w-[58px] h-[58px] ${
            !isEighteen ? "opacity-0" : "opacity-100"
          }`}
          alt=""
        />
        <div
          ref={navHomeContainerRef}
          className={`border border-white rounded p-md flex gap-md justify-between md:justify-normal invisible w-full md:w-auto ${
            !isEighteen ? "opacity-0" : "opacity-1 transition-opacity"
          }`}
        >
          <div className="font-serif text-md text-white">
            <span
              onClick={() => handleNavigation("/about")}
              className="transition-text-shadow ease-in-out duration-sm cursor-pointer hover:text-shadow-glow"
            >
              About
            </span>
          </div>
          <div
            ref={archiveButtonRef}
            className={`font-serif text-md text-white`}
          >
            {isSubmitted ? (
              <span
                onClick={() => handleNavigation("/archive")}
                className="cursor-pointer hover:text-shadow-glow"
                style={{ transition: "text-shadow 500ms ease-in-out" }}
              >
                Archive
              </span>
            ) : (
              <span className="cursor-default blur">Archive</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHome;
