import { EventService, type Events } from "@/api/brawl-stars-api";
import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "events";

/**
 * Custom hook to fetch and manage game events data
 * @returns Object containing loading state and events data
 */
export const useEvents = () => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing events data
  const [events, setEvents] = useState<Events | null>(null);

  // Function to fetch events data
  const fetchEvents = async () => {
    try {
      // Try to read cached events from sessionStorage
      const cached = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (cached) {
        setEvents(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch events from service
      const res = await EventService.getEvents();
      if (!res) return;

      // Update state with fetched events
      setEvents(res);

      // Persist events in sessionStorage
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(res));
    } catch (error) {
      console.error(error);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  // Effect to trigger data fetch on component mount
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array - runs only once

  // Return loading state and events data
  return { loading, events };
};
