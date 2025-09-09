import { DesktopNavigation, NavFooter, NavHeader } from "@/components";
import { Outlet } from "react-router-dom";

export const DesktopLayout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen bg-neutral-800 text-neutral-100">
      <aside className="flex flex-col row-span-2 gap-4 p-4 w-fit bg-neutral-900">
        <NavHeader textSize="text-h5" />
        <DesktopNavigation />
        <NavFooter />
      </aside>

      <main className="flex items-center justify-center w-full h-screen">
        <Outlet />
      </main>
    </div>
  );
};
