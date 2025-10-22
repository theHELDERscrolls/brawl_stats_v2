import { useState, useCallback } from "react";
import { Popup } from "@/components";

// Define available popup types
type PopupType = "success" | "error" | "warning";

// Interface for popup data structure
interface PopupData {
  message: string;
  type: PopupType;
  key: number;
}

/**
 * Custom hook for managing popup notifications
 * Provides a way to show temporary popup messages with different types
 * @returns Object containing popup component and showPopup function
 */
export const usePopup = () => {
  // State to store current popup data (null when no popup is shown)
  const [popupData, setPopupData] = useState<PopupData | null>(null);

  // Memoized function to display a popup
  const showPopup = useCallback((message: string, type: PopupType = "success") => {
    // Set popup data with unique key to ensure proper re-rendering
    setPopupData({ message, type, key: Date.now() });
  }, []);

  // Popup component to be rendered in the JSX
  const popup = popupData ? (
    <Popup key={popupData.key} message={popupData.message} type={popupData.type} />
  ) : null;

  // Return the popup component and function to show popups
  return { popup, showPopup };
};
