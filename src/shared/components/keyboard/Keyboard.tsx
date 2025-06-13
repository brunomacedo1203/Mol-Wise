"use client";
import React, { useState } from "react";
import KeyboardBtn from "./KeyboardBtn";

const lettersRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const lettersRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const lettersRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

export default function Keyboard({
  onKeyPress,
}: {
  onKeyPress?: (key: string) => void;
}) {
  const [isUpperCase, setIsUpperCase] = useState(true);

  const display = (char: string) =>
    isUpperCase ? char.toUpperCase() : char.toLowerCase();

  return (
    <div className="flex flex-col items-center bg-transparent p-0 rounded-xl">
      <div className="flex gap-2 mb-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((key) => (
          <KeyboardBtn key={key} onClick={() => onKeyPress?.(key)}>
            {key}
          </KeyboardBtn>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        {lettersRow1.map((key) => (
          <KeyboardBtn key={key} onClick={() => onKeyPress?.(display(key))}>
            {display(key)}
          </KeyboardBtn>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <KeyboardBtn onClick={() => setIsUpperCase((u) => !u)}>⇧</KeyboardBtn>
        {lettersRow2.map((key) => (
          <KeyboardBtn key={key} onClick={() => onKeyPress?.(display(key))}>
            {display(key)}
          </KeyboardBtn>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        {lettersRow3.map((key) => (
          <KeyboardBtn key={key} onClick={() => onKeyPress?.(display(key))}>
            {display(key)}
          </KeyboardBtn>
        ))}
        <KeyboardBtn onClick={() => onKeyPress?.(".")}>.</KeyboardBtn>
      </div>
    </div>
  );
}
