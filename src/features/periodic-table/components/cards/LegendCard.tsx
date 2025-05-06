export default function LegendCard() {
  return (
    <div className="w-[160px] h-[160px] col-span-2 row-span-2 border-2 border-black bg-white flex flex-col justify-between p-2">
      <div className="flex w-full">
        <span className="font-normal text-[14px] leading-tight text-black">
          ATOMIC NUMBER
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="font-bold text-2xl text-black">SYMBOL</span>
        <span className="text-black text-sm text-center mt-1">NAME</span>
      </div>
      <div className="flex w-full items-end justify-center">
        <span className="font-normal text-[14px] leading-tight text-center text-black">
          ATOMIC MASS
        </span>
      </div>
    </div>
  );
}
