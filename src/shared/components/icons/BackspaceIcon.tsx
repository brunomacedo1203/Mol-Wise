import React from "react";

interface BackspaceIconProps {
  size?: number;
  className?: string;
}

export function BackspaceIcon({
  size = 24,
  className = "",
}: BackspaceIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
      <path d="M12 10l4 4m0 -4l-4 4" />
    </svg>
  );
}
