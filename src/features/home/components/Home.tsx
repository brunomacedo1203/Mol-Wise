import { IconBrandReact } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full text-zinc-500">
      <IconBrandReact size={200} stroke={1} />
      <span className="font-black">
        The best Mol Wise website in the world!
      </span>
      <span className="text-sm font-black">
        Here, you will find everything you need to practice chemistry
      </span>
    </div>
  );
}
