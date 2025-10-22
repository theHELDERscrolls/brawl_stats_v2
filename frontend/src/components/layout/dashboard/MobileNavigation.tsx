import { BasicTag, navLinks } from "@/components";
import { NavLink } from "react-router-dom";

export const MobileNavigation = () => {
  return (
    <nav className="flex flex-col w-full h-full py-6 border-t border-b border-neutral-800">
      <ul className="flex flex-col justify-start h-full gap-2">
        {navLinks.map(({ key, iconId, title }) => {
          const to = key === "home" ? "/" : key;
          return (
            <NavLink
              key={key}
              to={to}
              end
              className={({ isActive }) =>
                [
                  "rounded-xl transition-all ease-in-out duration-300 cursor-pointer flex justify-between items-center",
                  isActive
                    ? "bg-gradient-to-r from-cyan-800/35 to-transparent text-cyan-400"
                    : "text-neutral-400 hover:text-neutral-100 hover:bg-gradient-to-r hover:from-neutral-700/35 hover:to-transparent",
                ].join(" ")
              }
            >
              <BasicTag iconId={iconId} title={title} titleClassName="text-h3" size={24} />
              <BasicTag iconId="icon-chevron" />
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};
