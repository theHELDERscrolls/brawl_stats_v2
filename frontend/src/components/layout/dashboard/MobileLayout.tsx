import { BasicTag } from "../../common";
import { MobileNavigation, NavFooter, NavHeader, navLinks } from "../components";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const MobileLayout = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const pathKey = location.pathname === "/" ? "home" : location.pathname.split("/")[1];
  const currentPage = navLinks.find((link) => link.key === pathKey);

  return (
    <div className="relative">
      <header className="relative flex items-center justify-center w-full p-2 bg-neutral-900 text-neutral-100">
        <BasicTag
          iconId="icon-menu"
          className="absolute right-0"
          onClick={() => setMenuOpen((prev) => !prev)}
        />
        <p className="font-sans font-semibold text-h5">{currentPage?.title ?? "Home"}</p>
      </header>

      <aside
        className={`absolute top-0 left-0 z-10 flex flex-col items-center w-full h-screen gap-4 p-4 transition-transform duration-300 transform bg-neutral-900 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between w-full">
          <NavHeader textSize="text-h2" />
          <BasicTag
            iconId="icon-cross"
            iconClassName="text-neutral-100"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </header>
        <MobileNavigation />
        <NavFooter />
      </aside>

      <main className="flex items-center justify-center w-full min-h-screen bg-neutral-800 text-neutral-100">
        <Outlet />
      </main>
    </div>
  );
};
