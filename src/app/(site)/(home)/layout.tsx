import LeftSideBar from "@/src/components/SideBar/Left";
import RightSideBar from "@/src/components/SideBar/Right";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-center bg-[#000] pt-3">
      <div className="w-1/12" />
      <div className="w-3/12">
        <LeftSideBar />
      </div>
      <div className="w-4/12 mx-10">{children}</div>
      <div className="w-4/12">
        <RightSideBar />
      </div>
    </div>
  );
}
