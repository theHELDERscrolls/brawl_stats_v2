import { RankingService, type GlobalClub } from "@/api/brawlstars";
import { useEffect, useState } from "react";

/**
 * Custom hook that fetches and returns the global club ranking data.
 * 
 * @module useRankingClubs
 * @returns {Object} An object containing the loading state and clubs array
 * @property {boolean} loading - Indicates if the data is currently being fetched
 * @property {Array<GlobalClub>} clubs - Array of global club ranking data
 * 
 * @example
 * // Example usage in a React component:
 * function ClubRankings() {
 *   const { loading, clubs } = useRankingClubs();
 *   
 *   if (loading) {
 *     return <div>Loading club rankings...</div>;
 *   }
 *   
 *   return (
 *     <div>
 *       <h2>Top Clubs</h2>
 *       <ul>
 *         {clubs.map(club => (
 *           <li key={club.tag}>
 *             {club.name} - {club.trophies} trophies
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 */
export const useRankingClubs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [clubs, setClubs] = useState<GlobalClub[]>([]);

  const fetchRankingClubs = async () => {
    try {
      const res = await RankingService.getRankingClubs();
      if (!res) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClubs(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingClubs();
  }, []);

  return { loading, clubs };
};
