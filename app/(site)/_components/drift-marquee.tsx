"use client";

import React, { useEffect, useState } from "react";

const marqueeLength: number = 3;

const DriftMarquee: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>([]);

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

  return (
    <div className="border border-white rounded p-sm flex flex-col gap-sm overflow-x-hidden">
      {order.map((index) => (
        <div
          key={index}
          className={`font-serif text-md text-white translate-x-[-20%] animate-marquee ${
            currentIndex === index ? "visible" : "invisible"
          }`}
        >
          <span className="blur">
            Drift
          </span>
        </div>
      ))}
    </div>
  );
};

export default DriftMarquee;
