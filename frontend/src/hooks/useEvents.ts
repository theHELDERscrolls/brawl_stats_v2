import { EventService, type Events } from "@/api/brawl-stars-api";
import { useEffect, useState } from "react";

/**
 * Fetches all game events including active and upcoming rotations.
 * @returns {{loading: boolean, events: Events|null}} Object containing loading state and events data.
 */
export const useEvents = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Events | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await EventService.getEvents();
      if (!res) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEvents(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { loading, events };
};
