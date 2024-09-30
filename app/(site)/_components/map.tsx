"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useVisibility } from "../_hooks/visibility-context";
import { useTransition } from "../_hooks/transition-context";

const Map: React.FC<{
  mapContainerRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  isTransition: boolean;
}> = ({ mapContainerRef, targetRef, isTransition }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true); // State to track visibility of the target component
  const [hoverText, setHoverText] = useState("Hide"); // State to track the hover text
  const { visibleContainers } = useVisibility();
  const [delayedVisibleContainers, setDelayedVisibleContainers] = useState<
    Record<string, boolean>
  >({});

  const pathname = usePathname(); // Get the current path
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const miniMapScale = 0.1;
  const miniMapWidth = windowSize.width * miniMapScale;
  const miniMapHeight = windowSize.height * miniMapScale;
  const cursorXOnMap = (cursorPosition.x / windowSize.width) * miniMapWidth;
  const cursorYOnMap = (cursorPosition.y / windowSize.height) * miniMapHeight;

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    setHoverText(isVisible ? "Show" : "Hide");

    if (targetRef.current) {
      targetRef.current.classList.toggle("opacity-0");
      targetRef.current.classList.toggle("opacity-100");
      targetRef.current.classList.toggle("invisible");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const updatedVisibility: Record<string, boolean> = Object.entries(
        visibleContainers
      ).reduce(
        (acc, [key, value]) => {
          // Apply the delay only to containers other than `questionsContainerRef`
          if (key === "questionsContainerRef") {
            acc[key] = !!value; // Ensure strict boolean conversion
          } else {
            acc[key] = !!value; // Default conversion for all others
          }
          return acc;
        },
        {} as Record<string, boolean>
      );

      setDelayedVisibleContainers(updatedVisibility);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [visibleContainers]);

  const { isTransitioning, setTransitioning } = useTransition();
  const fadeDuration = 3000;

  // useEffect(() => {
  //   if (pathname === "/" || pathname === "/drift") {
  //     mapContainerRef.current!.style.opacity = "1";
  //   } else {
  //     if (!isTransitioning) {
  //       setTransitioning(true);
  //       mapContainerRef.current!.style.opacity = "0";
  //       setTimeout(() => {
  //         setTransitioning(false);
  //       }, fadeDuration);
  //     }
  //   }
  // }, [pathname, isTransitioning]);

  const containerMap = {
    textIntroContainerRef: "row-start-1 col-start-1 md:col-start-2 xl:col-start-3",
    progressBarContainerRef: "row-start-3 col-start-1",
    driftContainerRef: "row-start-4 col-start-1 md:col-start-2 xl:col-start-3",
    completedContainerRef: "row-start-2 col-start-1",
    orbContainerRef: "row-start-2 row-span-2 col-start-1 col-span-1 md:col-start-2 md:col-span-1 xl:col-start-2 xl:col-span-3",
    questionsContainerRef: "row-start-3 col-start-1 md:col-start-3 xl:col-start-5",
    barVideoContainerRef: "row-start-3 col-start-1",
    textCodeContainerRef: "row-start-2 col-start-1",
    textProjectContainerRef: "row-start-2 row-span-2 col-start-1 md:col-start-3 xl:col-start-5",
  };

  return (
    <div
      ref={mapContainerRef}
      className={`absolute top-lg right-lg hidden md:flex flex-col items-end gap-md invisible`}
    >
      <div
        ref={mapRef}
        className={`group relative border border-white rounded overflow-hidden cursor-pointer z-20 `}
        style={{
          width: `${miniMapWidth}px`,
          height: `${miniMapHeight}px`,
        }}
        onMouseEnter={() => setHoverText(isVisible ? "Hide" : "Show")}
        onMouseLeave={() => setHoverText(isVisible ? "Hide" : "Show")}
        onClick={handleToggleVisibility} // Toggle visibility on click, only on the mapRef div
      >
        <div className="absolute h-full w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 grid-rows-4 gap-sm p-sm transition-all ease-in-out duration-sm group-hover:blur">
          {Object.entries(containerMap).map(([refName, gridClass]) => (
            <div
              key={refName}
              className={`${gridClass} border border-white transition-all ease-in-out duration-md ${
                refName === "textIntroContainerRef" ||
                refName === "questionsContainerRef" ||
                refName === "progressBarContainerRef" ||
                refName === "driftContainerRef" ||
                refName === "barVideoContainerRef" ||
                refName === "textCodeContainerRef" ||
                refName === "textProjectContainerRef"
                  ? visibleContainers[refName]
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                  : delayedVisibleContainers[refName]
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
              }`}
            ></div>
          ))}
        </div>

        {/* Cursor indicator */}
        <div
          className="absolute font-mono text-white text-sm group-hover:blur"
          style={{
            left: `${cursorXOnMap}px`,
            top: `${cursorYOnMap}px`,
            transform: "translate(-50%, -50%)",
            transition: "filter ease-in-out 500ms",
          }}
        >
          +
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-sm text-white font-mono text-sm">
          {hoverText}
        </div>
      </div>
      <div
        className="text-white font-mono text-sm z-10"
        style={{
          width: `${miniMapWidth}px`,
        }}
      >
        x: {cursorPosition.x}
        <br />
        y: {cursorPosition.y}
      </div>
    </div>
  );
};

export default Map;
