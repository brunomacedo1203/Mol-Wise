"use client";

import { useEffect } from "react";
import { useSubtitleStore } from "@/shared/store/subtitleStore";

interface HomeClientProps {
  welcome: string;
  subtitle: string;
  chooseTool: string;
}

export default function HomeClient({
  welcome,
  subtitle,
  chooseTool,
}: HomeClientProps) {
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle);

  useEffect(() => {
    setSubtitle(chooseTool);
    return () => setSubtitle("");
  }, [setSubtitle, chooseTool]);

  return (
    <div className="flex-1 flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4 text-blue-700">{welcome}</h1>
        <p className="text-lg text-zinc-700 mb-8 dark:text-zinc-100">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
export const dynamic = "force-static";
