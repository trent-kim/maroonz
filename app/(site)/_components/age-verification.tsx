"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback, SetStateAction, Dispatch } from "react";


const AgeVerification: React.FC<{setIsEighteen: Dispatch<SetStateAction<boolean>>; isEighteen: boolean; }> = ({setIsEighteen, isEighteen}) => {
  return (
    <div 
      className={`border border-white rounded p-md flex flex-col gap-md transition-all ease-in-out duration-md ${
      isEighteen ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <div className="font-mono text-sm text-white">Are you 18 years old or older?</div>
      <div className="font-serif text-md text-white">
        <span 
          onClick={() => {
            setIsEighteen(true)
          }}
          className="hover:text-shadow-glow transition-[text-shadow] ease-in-out duration-sm cursor-pointer"
        >
          Yes
        </span>
        <br></br>
        <span 
          onClick={() => {
            setIsEighteen(false)
          }}
          className="hover:text-shadow-glow transition-[text-shadow] ease-in-out duration-sm cursor-pointer"
        >          
          No
        </span>
      </div>
    </div>
  );
};

export default AgeVerification;
