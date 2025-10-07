import {
  BrawlerSelectorSkeleton,
  ClubTag,
  PageHeader,
  PlayerTag,
  RankingSection,
} from "@/components";
import { rarityShadowStyle, preloadImages } from "@/utils";
import { useBrawlers } from "../brawlers";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks";
import { useRankingBrawlers, useRankingClubs, useRankingPlayers } from "./hooks";
import { useSearchParams } from "react-router-dom";

export const Ranks = () => {
  const hasDetails = useMediaQuery("(min-width: 640px)");
  const bestPlayersSectionRef = useRef<HTMLDivElement | null>(null);

  // Custom hooks que definen el estado de carga y devuelven un contenido concreto.
  const { players, loading: playersLoading } = useRankingPlayers();
  const { clubs, loading: clubsLoading } = useRankingClubs();
  const { brawlers, loading: brawlersLoading } = useBrawlers();

  const [searchParams, setSearchParams] = useSearchParams();
  // Lee el param de brawler guardado en la URL
  const brawlerIdParam = searchParams.get("brawler");
  // Convertimos el param a number (por defecto es string) para poder usarlo en useRankingBrawlers()
  const [selectedBrawlerId, setSelectedBrawlerId] = useState<number | null>(
    brawlerIdParam ? Number(brawlerIdParam) : null
  );

  const { bestPlayers, loading: bestPlayersLoading } = useRankingBrawlers(selectedBrawlerId);

  const [imagesReady, setImagesReady] = useState(false);

  // Ejecuta cada vez que termina de cargar los brawlers o la lista cambia.
  useEffect(() => {
    const loadImages = async () => {
      if (!brawlersLoading && brawlers.length > 0) {
        const urls = brawlers.map((b) => b.imageUrl2);
        // Generamos un objeto Image en memoria y esperamos que todas carguen.
        await preloadImages(urls);
        setImagesReady(true);
      }
    };

    loadImages();
  }, [brawlersLoading, brawlers]);

  useEffect(() => {
    if (brawlerIdParam && imagesReady && bestPlayersSectionRef.current) {
      bestPlayersSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [brawlerIdParam, imagesReady]);

  // Función que recupera el id del brawler para cambiar el param de la URL y realizar una
  // búsqueda de los mejores jugadores por ese brawler automáticamente.
  const handleSelectBrawler = (id: number) => {
    setSelectedBrawlerId(id);
    setSearchParams({ brawlerId: id.toString() });
  };

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <PageHeader
        title="Rankings"
        desc="This section displays the worldwide rankings of players, clubs, and individual brawlers."
      />

      <div className="flex flex-col items-center justify-center gap-8 2xl:flex-row ">
        <RankingSection
          title="Best Players"
          items={players}
          loading={playersLoading}
          renderItem={(p) => (
            <PlayerTag key={p.tag} player={p} variant="withClub" showDetails={hasDetails} />
          )}
        />

        <RankingSection
          title="Best Clubs"
          items={clubs}
          loading={clubsLoading}
          renderItem={(c) => <ClubTag key={c.tag} club={c} showDetails={hasDetails} />}
        />
      </div>

      <section
        ref={bestPlayersSectionRef}
        className="flex flex-col items-center w-full gap-4 p-4 shadow-xl rounded-xl bg-neutral-900/50 shadow-neutral-900"
      >
        <h3 className="self-start text-h3 text-amber-400 font-brawlstars font-extralight">
          Best players by brawler
        </h3>

        <div className="flex flex-wrap items-center justify-center w-full gap-2">
          {brawlersLoading || !imagesReady ? (
            <BrawlerSelectorSkeleton count={100} />
          ) : (
            brawlers
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((b) => (
                <img
                  key={b.id}
                  src={b.imageUrl2}
                  alt={`${b.name} icon`}
                  title={b.name}
                  className={`transition-all ease-in-out cursor-pointer h-13 hover:-translate-y-1 border-2 border-neutral-900 ${
                    selectedBrawlerId === b.id ? "ring-3 rounded ring-cyan-400" : ""
                  } ${rarityShadowStyle(b)}`}
                  onClick={() => handleSelectBrawler(b.id)}
                />
              ))
          )}
        </div>

        {selectedBrawlerId && (
          <RankingSection
            title="Top Players"
            items={bestPlayers}
            loading={bestPlayersLoading}
            renderItem={(bp) => (
              <PlayerTag key={bp.tag} player={bp} showDetails={hasDetails} variant="withTrophies" />
            )}
          />
        )}
      </section>
    </div>
  );
};
