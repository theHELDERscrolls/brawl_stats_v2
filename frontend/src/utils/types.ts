export type BasicStats = {
  victories: number;
  defeats: number;
  draws: number;
};

export type TrophiesProgression = {
  time: string;
  timestamp: Date;
  trophies: number | null;
};

export type MostPlayedGameModes = {
  gameMode: string;
  games: number;
};

export type BrawlerByTrophies = {
  id: number;
  name: string;
  highestTrophies: number;
};

export type NormalizedBattle = {
  map: {
    id: number;
    name: string | undefined;
  };
  result?: string;
  trophyChange?: number;
  starPlayer?: {
    name: string;
    brawlerId: number;
  };
  teams?: {
    name: string;
    brawlerId: number;
  }[][];
  players?: {
    name: string;
    brawlerId: number | undefined;
  }[];
  mode: {
    scHash: string|undefined;
    imageUrl: string;
    bgColor: string;
    bgImg: string;
  } | null;
};
