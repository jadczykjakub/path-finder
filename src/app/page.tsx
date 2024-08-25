import Image from "next/image";
import MazeGrid from "./path-finder/components/MazeGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className=" grid gap-8 justify-items-center  ">
      <h1 className='text-2xl font-bold text-center'>Visual presentation of 2 algorithms</h1>

      <MazeGrid width={10} height={12} />
    </div>
    </main>
  );
}
