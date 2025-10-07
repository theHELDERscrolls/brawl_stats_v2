import {
  BarChart,
  Bar,
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
  type PieLabelRenderProps,
} from "recharts";
import type { BasicStats, TrophiesProgression, MostPlayedGameModes } from "@/utils/types";
import { useMediaQuery } from "@/hooks";
import { PlayerTopBrawlers } from "./PlayerTopBrawlers";
import { getTopBrawlersByTrophies } from "@/utils";
import type { PlayerInfo } from "@/api/brawlstars";

interface PlayerStatsChartsProps {
  stats: BasicStats;
  trophiesProgression: TrophiesProgression[];
  mostPlayedGameModes: MostPlayedGameModes[];
  playerInfo: PlayerInfo;
}

export const PlayerStatsCharts = ({
  stats,
  trophiesProgression,
  mostPlayedGameModes,
  playerInfo,
}: PlayerStatsChartsProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 425px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const { victories, defeats, draws } = stats;
  const pieData = [
    { name: "Victories", value: victories, fill: "#9AE600" },
    { name: "Defeats", value: defeats, fill: "#FF6467" },
    { name: "Draws", value: draws, fill: "#51A2FF" },
  ];

  const topBrawlers = getTopBrawlersByTrophies(playerInfo);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {/* Pie Chart */}
      <div className="flex items-center justify-center p-2 rounded-xl w-fit h-fit bg-neutral-900/50">
        <PieChart
          width={isSmallScreen ? 250 : 300}
          height={isSmallScreen ? 250 : 400}
          className="font-brawlstars font-extralight"
        >
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={75}
            innerRadius={50}
            label={({ value }: PieLabelRenderProps) => `${value}`}
            paddingAngle={5}
            strokeWidth={0}
          />
          <Legend verticalAlign="top" align="center" iconType="circle" />
        </PieChart>
      </div>

      {/* Line Chart */}
      <div className="flex items-center justify-center p-2 rounded-xl w-fit h-fit bg-neutral-900/50">
        <LineChart
          width={isSmallScreen ? 250 : 300}
          height={isSmallScreen ? 250 : 400}
          data={trophiesProgression}
          className="font-brawlstars font-extralight"
        >
          <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.2} />
          <XAxis hide />
          <YAxis
            domain={["dataMin - 5", "dataMax + 5"]}
            hide={isTablet}
            tick={{ fill: "#f5f5f5" }}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              return (
                <div className="px-2 py-1 shadow rounded-xl bg-neutral-950 font-brawlstars font-extralight text-amber-400">
                  {payload[0].value}
                </div>
              );
            }}
          />
          <Legend iconType="plainline" />
          <Line
            type="monotone"
            dataKey="trophies"
            stroke="#FFB900"
            strokeWidth={2}
            dot={{ fill: "#FFB900" }}
          />
        </LineChart>
      </div>

      {/* Bar Chart */}
      <div className="flex items-center justify-center p-2 rounded-xl w-fit h-fit bg-neutral-900/50">
        <BarChart
          layout="vertical"
          width={isSmallScreen ? 250 : 300}
          height={isSmallScreen ? 250 : 400}
          data={mostPlayedGameModes}
          className="font-brawlstars font-extralight"
        >
          <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.2} />
          <XAxis type="number" tick={{ fill: "#f5f5f5" }} />
          <YAxis type="category" dataKey="gameMode" tick={{ fill: "#f5f5f5" }} width={116} />
          <Legend />
          <Bar dataKey="games" fill="#0092B8" activeBar={<Rectangle fill="#00D3F3" />}>
            <LabelList
              dataKey="games"
              position="center"
              fill="#f5f5f5"
              fontFamily="brawlstars,sans-serif"
            />
          </Bar>
        </BarChart>
      </div>

      {/* Top Brawlers Chart */}
      <PlayerTopBrawlers topBrawlers={topBrawlers} />
    </div>
  );
};
