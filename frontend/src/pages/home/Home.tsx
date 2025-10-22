import { useEffect } from "react";
import { useMediaQuery } from "@/hooks";
import {
  ActiveMapsCard,
  BrawlerOfTheDayCard,
  ClubModal,
  PageHeader,
  PlayerModal,
  SearchClubTagForm,
  SearchPlayerTagForm,
  TopRankedClubsCard,
  TopRankedPlayersCard,
  useModalContext,
} from "@/components";

const Home = () => {
  const isTablet = useMediaQuery("(min-width: 880px)");

  const { openModal } = useModalContext();

  const handlePlayerSubmit = (playerTag: string) => {
    openModal(<PlayerModal playerTag={playerTag} />, {
      withBackdrop: true,
      withCloseButton: true,
      centered: true,
    });
  };

  const handleClubSubmit = (clubTag: string) => {
    openModal(<ClubModal clubTag={clubTag} />, {
      withBackdrop: true,
      withCloseButton: true,
      centered: true,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="flex flex-col w-full h-full gap-8">
      <PageHeader
        title="Welcome to Brawl Stats!"
        desc="Search for palyer and club information, explore stats and player and club rankings."
      />
      <div className={`grid gap-4 ${!isTablet ? "grid-cols-1" : "grid-cols-2"}`}>
        <SearchPlayerTagForm onSubmit={handlePlayerSubmit} />
        <SearchClubTagForm onSubmit={handleClubSubmit} />
        <BrawlerOfTheDayCard />
        <TopRankedPlayersCard />
        <TopRankedClubsCard />
        <ActiveMapsCard />
      </div>
    </section>
  );
};

export default Home;
