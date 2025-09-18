import { DesktopNavigation, NavFooter, NavHeader } from "@/components";
import { Outlet } from "react-router-dom";

export const DesktopLayout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen bg-neutral-800 text-neutral-100">
      <aside className="sticky top-0 flex flex-col h-screen row-span-2 gap-4 p-4 w-fit bg-neutral-900">
        <NavHeader textSize="text-h5" />
        <DesktopNavigation />
        <NavFooter />
      </aside>

      <main className="flex items-center justify-center w-full min-h-screen px-10 py-5 bg-neutral-800">
        <Outlet />
      </main>
    </div>
  );
};
