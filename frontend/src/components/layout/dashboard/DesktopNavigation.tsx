import { BasicTag, navLinks } from "@/components";
import { NavLink } from "react-router-dom";

export const DesktopNavigation = () => {
  return (
    <nav className="flex flex-col h-full gap-2 py-6 border-t border-b border-neutral-800">
      <ul className="flex flex-col justify-start w-full h-full gap-2">
        {navLinks.map(({ key, iconId, title }) => {
          const to = key === "home" ? "/" : key;
          return (
            <NavLink
              key={key}
              to={to}
              end
              className={({ isActive }) =>
                [
                  "rounded-xl transition-all ease-in-out duration-300 cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-cyan-800/35 to-transparent text-cyan-400"
                    : "text-neutral-400 hover:text-neutral-100 hover:bg-gradient-to-r hover:from-neutral-700/35 hover:to-transparent",
                ].join(" ")
              }
            >
              <BasicTag iconId={iconId} title={title} />
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};
