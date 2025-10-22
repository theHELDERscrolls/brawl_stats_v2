import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BasicTag } from "./BasicTag";

interface PopupProps {
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
}

type PopupState = "enter" | "visible" | "exit" | "hidden";

export const Popup = ({ message, type = "success", duration = 5000 }: PopupProps) => {
  const [state, setState] = useState<PopupState>("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setState("visible"), 50);
    const exitTimer = setTimeout(() => setState("exit"), duration - 400);
    const removeTimer = setTimeout(() => setState("hidden"), duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (state === "hidden") return null;

  const style =
    type === "success"
      ? "bg-lime-950 md:bg-gradient-to-r md:from-lime-800/35 md:to-lime-800/10 text-lime-400 border-l-2 border-lime-400"
      : type === "warning"
      ? "bg-yellow-950 md:bg-gradient-to-r md:from-yellow-800/35 md:to-yellow-800/10 text-yellow-400 border-l-2 border-yellow-400"
      : "bg-red-950 md:bg-gradient-to-r md:from-red-800/35 md:to-red-800/10 text-red-400 border-l-2 border-red-400";

  const animation =
    state === "enter"
      ? "opacity-0 -translate-y-10"
      : state === "visible"
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-10";

  return createPortal(
    <div
      className={`
        fixed z-50 p-3 rounded-xl top-4 right-1/2 translate-x-1/2 sm:right-6 sm:translate-x-0
        transition-all duration-500 ease-in-out shadow-lg w-3xs
        ${animation} ${style}
      `}
    >
      <BasicTag
        iconId={
          type === "success" ? "icon-check" : type === "warning" ? "icon-warning" : "icon-error"
        }
        size={32}
        title={message}
        titleClassName="text-p"
        fontClassName="font-brawlstars font-extralight"
      />
    </div>,
    document.body
  );
};
