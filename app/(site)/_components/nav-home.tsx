"use client";

import { Logo } from "@/types/Logo";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTransition } from "../_hooks/transition-context";

const NavHome: React.FC<{
  logoRef: React.RefObject<HTMLImageElement>;
  navHomeContainerRef: React.RefObject<HTMLDivElement>;
  archiveButtonRef: React.RefObject<HTMLDivElement>;
  isSubmitted: boolean;
  logo: Logo[];
  isEighteen: boolean;
  setIsNavClicked: Dispatch<SetStateAction<boolean>>;
}> = ({ logoRef, navHomeContainerRef, archiveButtonRef, isSubmitted, logo, isEighteen, setIsNavClicked }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { isTransitioning, setTransitioning } = useTransition();
  const fadeDuration = 3000;

const handleNavigation = (url: string) => {
    if (!isTransitioning) {
      setTransitioning(true);
      setIsNavClicked(true);
      // // Trigger fade out for the current container (Archive or About)
      // const currentContainerRef = document.querySelector(".fade-container");
      // if (currentContainerRef) {
      //   (currentContainerRef as HTMLElement).style.opacity = "0";
      //   (currentContainerRef as HTMLElement).style.transition = `opacity ${fadeDuration}ms ease-in-out`;
      // }

      // Delay navigation until the fade out completes
      setTimeout(() => {
        router.push(url);
        setTransitioning(false); // Reset the transition state after navigation
      }, fadeDuration);
    }
  };

  // useEffect(() => {
  //   if (!isTransitioning && isEighteen) {
  //     if (navHomeContainerRef.current) {
  //       navHomeContainerRef.current.style.opacity = "1";
  //       navHomeContainerRef.current.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
  //     }
  //   }
  // }, [isTransitioning, isEighteen]);

  return (
    <div className="absolute top-lg left-lg z-20">
      <div className="flex gap-lg items-center">
        <Image
          ref={logoRef}
          src={logo[0].image}
          width={58}
          height={58}
          onClick={() => handleNavigation("/")}
          className={` cursor-pointer ${
            !isEighteen
              ? "opacity-0"
              : "opacity-1 transition-opacity"
          }`}
          alt=""
        />
        <div
          ref={navHomeContainerRef}
          className={`border border-white rounded p-md flex gap-md invisible ${
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
            className={`font-serif text-md text-white blur`}
            // style={{
            //   transitionDelay: "3000ms",
            //   transitionProperty: "filter",
            // }}
          >
            {isSubmitted ? (
              <span
                onClick={() => handleNavigation("/archive")}
                className="cursor-pointer hover:text-shadow-glow transition-all ease-in-out duration-sm"
              >
                Archive
              </span>
            ) : (
              <span className="cursor-default">Archive</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHome;
