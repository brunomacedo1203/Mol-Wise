import Content from "@/shared/components/Content";
import { SubtitleProvider } from "@/shared/contexts/SubtitleContext";

export default function Home() {
  return (
    <SubtitleProvider subtitle="Choose a tool in the sidebar to get started.">
      <Content title="Mol Wise">
        <div className="flex-1 flex justify-center items-center w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4 text-blue-700">
              Welcome to Mol Wise!
            </h1>
            <p className="text-lg text-zinc-700 mb-8 dark:text-zinc-100">
              Choose a tool in the sidebar to get started.
            </p>
          </div>
        </div>
      </Content>
    </SubtitleProvider>
  );
}
