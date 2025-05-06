"use client";
import React, { createContext, useContext } from "react";

const SubtitleContext = createContext<string | undefined>(undefined);

export const useSubtitle = () => useContext(SubtitleContext);

export const SubtitleProvider = ({
  subtitle,
  children,
}: {
  subtitle: string;
  children: React.ReactNode;
}) => (
  <SubtitleContext.Provider value={subtitle}>
    {children}
  </SubtitleContext.Provider>
);
