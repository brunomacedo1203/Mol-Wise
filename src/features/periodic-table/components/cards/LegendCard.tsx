export default function LegendCard() {
  return (
    <div
      className="w-[160px] h-[160px] col-span-2 row-span-2 border-2 border-black bg-white flex flex-col justify-between p-2 dark:bg-gray-800 dark:border-white 
dark:bg-zinc-900"
    >
      <div className="flex w-full">
        <span className="font-normal text-[14px] leading-tight text-black dark:text-zinc-100">
          ATOMIC NUMBER
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center dark:text-zinc-100">
        <span className="font-bold text-2xl text-black dark:text-zinc-100">
          SYMBOL
        </span>
        <span className="text-black text-sm text-center mt-1 dark:text-zinc-100">
          NAME
        </span>
      </div>
      <div className="flex w-full items-end justify-center dark:text-zinc-100">
        <span className="font-normal text-[14px] leading-tight text-center text-black dark:text-zinc-100">
          ATOMIC MASS
        </span>
      </div>
    </div>
  );
}
