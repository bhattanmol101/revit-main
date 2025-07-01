import LeftSideBar from "@/src/components/SideBar/Left";
import RightSideBar from "@/src/components/SideBar/Right";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-row justify-center bg-[#000] sm:pt-3 pt-1"
      suppressHydrationWarning
    >
      <div className="w-1/12 lg:block hidden" />
      <div className="w-3/12 lg:block hidden">
        <LeftSideBar />
      </div>
      <div className="lg:w-4/12 sm:w-8/12 w-full lg:mx-10 sm:px-4 px-1">
        {children}
      </div>
      <div className="w-4/12 hidden sm:block">
        <RightSideBar />
      </div>
    </div>
  );
}
