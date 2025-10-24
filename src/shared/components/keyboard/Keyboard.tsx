"use client";
import React, { useState } from "react";
import KeyboardBtn from "./KeyboardBtn";

const lettersRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const lettersRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const lettersRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

interface KeyboardProps {
  onKeyPress?: (key: string) => void;
  size?: "md" | "compact";
}

export default function Keyboard({
  onKeyPress,
  size = "md",
}: KeyboardProps) {
  const [isUpperCase, setIsUpperCase] = useState(true);

  const display = (char: string) =>
    isUpperCase ? char.toUpperCase() : char.toLowerCase();

  return (
    <div className="flex flex-col items-center bg-transparent p-0 rounded-xl">
      <div className="flex gap-1.5 mb-1.5">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((key) => (
          <KeyboardBtn
            key={key}
            onClick={() => onKeyPress?.(key)}
            size={size}
          >
            {key}
          </KeyboardBtn>
        ))}
      </div>
      <div className="flex gap-1.5 mb-1.5">
        {lettersRow1.map((key) => (
          <KeyboardBtn
            key={key}
            onClick={() => onKeyPress?.(display(key))}
            size={size}
          >
            {display(key)}
          </KeyboardBtn>
        ))}
      </div>
      <div className="flex gap-1.5 mb-1.5">
        <KeyboardBtn
          onClick={() => setIsUpperCase((u) => !u)}
          size={size}
        >
          ⇧
        </KeyboardBtn>
        {lettersRow2.map((key) => (
          <KeyboardBtn
            key={key}
            onClick={() => onKeyPress?.(display(key))}
            size={size}
          >
            {display(key)}
          </KeyboardBtn>
        ))}
      </div>
      <div className="flex gap-1.5 mb-1.5">
        {lettersRow3.map((key) => (
          <KeyboardBtn
            key={key}
            onClick={() => onKeyPress?.(display(key))}
            size={size}
          >
            {display(key)}
          </KeyboardBtn>
        ))}
        <KeyboardBtn onClick={() => onKeyPress?.(".")} size={size}>
          .
        </KeyboardBtn>
      </div>
    </div>
  );
}
