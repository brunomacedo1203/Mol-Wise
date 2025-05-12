export default function PeriodicTableLegend() {
  return (
    <div className="absolute bottom-5 left-5 bg-gray-100 border-2 border-black w-[144px] h-[144px] flex flex-col justify-center dark:bg-gray-800 dark:border-white">
      <div className="flex flex-col items-center text-black text-sm dark:text-white">
        <span className="font-normal">NÚMERO ATÔMICO</span>
        <span className="text-2xl my-2">SÍMBOLO</span>
        <span className="font-normal">NOME</span>
        <span className="font-normal">MASSA ATÔMICA</span>
      </div>
    </div>
  );
}
