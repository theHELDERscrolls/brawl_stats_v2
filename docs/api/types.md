# Types — API Proxy Server

This document describes the TypeScript types used across the API Proxy Server. These types are imported from `api-proxy-server/src/types` and ensure consistent data validation and typing throughout the project.

---

## 1. Client Errors

Types related to error responses returned by the Brawl Stars API or the proxy server.

```ts
export const DetailsSchema = z.object({});
export type Details = z.infer<typeof DetailsSchema>;

export const ClientErrorSchema = z.object({
  reason: z.string().optional(),
  message: z.string().optional(),
  type: z.string().optional(),
  details: DetailsSchema.optional(),
});
export type ClientError = z.infer<typeof ClientErrorSchema>;
```

**Fields:**

| Field     | Type       | Description                                      |
| --------- | ---------- | ------------------------------------------------ |
| `reason`  | string?    | Optional reason for the error.                   |
| `message` | string?    | Error message.                                   |
| `type`    | string?    | Error type identifier.                           |
| `details` | `Details?` | Additional information (currently empty object). |

---

## 2. Shared Types

Common types used across multiple entities and endpoints.

```ts
export const IconSchema = z.object({
  id: z.number(),
});
export type Icon = z.infer<typeof IconSchema>;

export const BasicClubSchema = z.object({
  name: z.string(),
});
export type BasicClub = z.infer<typeof BasicClubSchema>;

export const CursorsSchema = z.object({});
export type Cursors = z.infer<typeof CursorsSchema>;

export const PagingSchema = z.object({
  cursors: CursorsSchema,
});
export type Paging = z.infer<typeof PagingSchema>;

export const NameColorSchema = z.string();
export type NameColor = z.infer<typeof NameColorSchema>;

export const BasicRankingItemSchema = z.object({
  tag: z.string(),
  name: z.string(),
  trophies: z.number(),
  rank: z.number().optional(),
});
export type BasicRankingItem = z.infer<typeof BasicRankingItemSchema>;
```

**Fields:**

| Field      | Type    | Description                           |
| ---------- | ------- | ------------------------------------- |
| `id`       | number  | Unique identifier for the icon.       |
| `name`     | string  | Club name for basic club information. |
| `tag`      | string  | Unique identifier for ranking items.  |
| `name`     | string  | Display name for ranking items.       |
| `trophies` | number  | Trophy count for ranking items.       |
| `rank`     | number? | Optional rank position.               |

**Notes:**

- `Icon` represents player and club icons throughout the application.
- `BasicRankingItem` serves as the base type for all ranking entities.
- `Paging` and `Cursors` are used for paginated API responses.

---

## 3. Club Types

Types used in `/clubs/:tag` endpoint and club-related data.

```ts
export const RoleSchema = z.string();
export type Role = z.infer<typeof RoleSchema>;

export const MemberSchema = z.object({
  tag: z.string(),
  name: z.string(),
  nameColor: z.string(),
  role: RoleSchema,
  trophies: z.number(),
  icon: IconSchema,
});
export type Member = z.infer<typeof MemberSchema>;

export const ClubSchema = z.object({
  tag: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  badgeId: z.number(),
  requiredTrophies: z.number(),
  trophies: z.number(),
  members: z.array(MemberSchema),
});
export type Club = z.infer<typeof ClubSchema>;
```

**Fields:**

| Field              | Type       | Description                        |
| ------------------ | ---------- | ---------------------------------- |
| `tag`              | string     | Club's unique tag identifier.      |
| `name`             | string     | Club display name.                 |
| `description`      | string     | Club description text.             |
| `type`             | string     | Club type (open, closed, etc.).    |
| `badgeId`          | number     | Club badge identifier.             |
| `requiredTrophies` | number     | Minimum trophies required to join. |
| `trophies`         | number     | Current club trophy count.         |
| `members`          | `Member[]` | Array of club members.             |

**Member Fields:**

| Field       | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| `tag`       | string | Member's unique tag.           |
| `name`      | string | Member's display name.         |
| `nameColor` | string | Color code for member's name.  |
| `role`      | `Role` | Member's role in the club.     |
| `trophies`  | number | Member's current trophy count. |
| `icon`      | `Icon` | Member's icon information.     |

**Notes:**

- `Role` represents member roles like "president", "vicePresident", "member".
- The `members` array includes all current club members with their detailed information.

---

## 4. Player Information Types

Types used in `/players/:tag` endpoint for player profile data.

```ts
export const GadgetSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Gadget = z.infer<typeof GadgetSchema>;

export const GearSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: z.number(),
});
export type Gear = z.infer<typeof GearSchema>;

export const PlayerClubSchema = z.object({
  tag: z.string().optional(),
  name: z.string().optional(),
});
export type PlayerClub = z.infer<typeof PlayerClubSchema>;

export const BrawlerSchema = z.object({
  id: z.number(),
  name: z.string(),
  power: z.number(),
  rank: z.number(),
  trophies: z.number(),
  highestTrophies: z.number(),
  gears: z.array(GearSchema),
  starPowers: z.array(GadgetSchema),
  gadgets: z.array(GadgetSchema),
});
export type Brawler = z.infer<typeof BrawlerSchema>;

export const PlayerInfoSchema = z.object({
  tag: z.string(),
  name: z.string(),
  nameColor: z.string().optional(),
  icon: IconSchema,
  trophies: z.number(),
  highestTrophies: z.number(),
  expLevel: z.number(),
  expPoints: z.number(),
  isQualifiedFromChampionshipChallenge: z.boolean(),
  "3vs3Victories": z.number(),
  soloVictories: z.number(),
  duoVictories: z.number(),
  bestRoboRumbleTime: z.number(),
  bestTimeAsBigBrawler: z.number(),
  club: PlayerClubSchema.optional().nullable(),
  brawlers: z.array(BrawlerSchema),
});
export type PlayerInfo = z.infer<typeof PlayerInfoSchema>;
```

**PlayerInfo Fields:**

| Field                                  | Type          | Description                                  |
| -------------------------------------- | ------------- | -------------------------------------------- |
| `tag`                                  | string        | Player's unique tag identifier.              |
| `name`                                 | string        | Player's display name.                       |
| `nameColor`                            | string?       | Optional color code for player name.         |
| `icon`                                 | `Icon`        | Player's icon information.                   |
| `trophies`                             | number        | Current total trophies.                      |
| `highestTrophies`                      | number        | Highest trophy count ever achieved.          |
| `expLevel`                             | number        | Player's current experience level.           |
| `expPoints`                            | number        | Total accumulated experience points.         |
| `isQualifiedFromChampionshipChallenge` | boolean       | Championship Challenge qualification status. |
| `3vs3Victories`                        | number        | Total victories in 3v3 game modes.           |
| `soloVictories`                        | number        | Total victories in solo showdown modes.      |
| `duoVictories`                         | number        | Total victories in duo showdown modes.       |
| `bestRoboRumbleTime`                   | number        | Best survival time in Robo Rumble.           |
| `bestTimeAsBigBrawler`                 | number        | Longest duration as Big Brawler.             |
| `club`                                 | `PlayerClub?` | Player's current club information.           |
| `brawlers`                             | `Brawler[]`   | Array of brawlers owned by the player.       |

**Brawler Fields:**

| Field             | Type       | Description                     |
| ----------------- | ---------- | ------------------------------- |
| `id`              | number     | Brawler's unique identifier.    |
| `name`            | string     | Brawler's display name.         |
| `power`           | number     | Brawler's current power level.  |
| `rank`            | number     | Brawler's current rank.         |
| `trophies`        | number     | Brawler's current trophy count. |
| `highestTrophies` | number     | Brawler's highest trophy count. |
| `gears`           | `Gear[]`   | Array of equipped gears.        |
| `starPowers`      | `Gadget[]` | Array of unlocked star powers.  |
| `gadgets`         | `Gadget[]` | Array of unlocked gadgets.      |

**Notes:**

- `PlayerClub` is optional and nullable for players without a club.
- `3vs3Victories`, `soloVictories`, and `duoVictories` track different game mode successes.
- Each `Brawler` contains comprehensive information about upgrades and achievements.

---

## 5. Battlelog Types

Types used in `/players/:tag/battlelog` endpoint for player battle history.

```ts
export const ModeSchema = z.string().optional();
export type Mode = z.infer<typeof ModeSchema>;

export const ResultSchema = z.string().optional();
export type Result = z.infer<typeof ResultSchema>;

export const TypeSchema = z.string().optional();
export type Type = z.infer<typeof TypeSchema>;

export const MapSchema = z.string().nullable();
export type Map = z.infer<typeof MapSchema>;

export const PlayerBrawlerSchema = z.object({
  id: z.number(),
  name: z.string(),
  power: z.number(),
  trophies: z.number(),
  trophyChange: z.number().optional(),
});
export type PlayerBrawler = z.infer<typeof PlayerBrawlerSchema>;

export const TeamPlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  brawler: PlayerBrawlerSchema,
});
export type TeamPlayer = z.infer<typeof TeamPlayerSchema>;

export const StarPlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  brawler: PlayerBrawlerSchema,
});
export type StarPlayer = z.infer<typeof StarPlayerSchema>;

export const EventSchema = z.object({
  id: z.number(),
  mode: ModeSchema,
  map: MapSchema,
});
export type Event = z.infer<typeof EventSchema>;

export const PlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  brawler: PlayerBrawlerSchema.optional(),
});
export type Player = z.infer<typeof PlayerSchema>;

export const BattleSchema = z.object({
  mode: ModeSchema,
  type: TypeSchema,
  result: ResultSchema,
  duration: z.number().optional(),
  trophyChange: z.number().optional(),
  starPlayer: StarPlayerSchema.nullable().optional(),
  teams: z.array(z.array(TeamPlayerSchema)).optional(),
  players: z.array(PlayerSchema).optional(),
});
export type Battle = z.infer<typeof BattleSchema>;

export const PlayerItemSchema = z.object({
  battleTime: z.string(),
  event: EventSchema,
  battle: BattleSchema,
});
export type PlayerItem = z.infer<typeof PlayerItemSchema>;

export const PlayerBattlelogSchema = z.object({
  items: z.array(PlayerItemSchema),
  paging: PagingSchema,
});
export type PlayerBattlelog = z.infer<typeof PlayerBattlelogSchema>;
```

**PlayerBattlelog Fields:**

| Field    | Type           | Description                      |
| -------- | -------------- | -------------------------------- |
| `items`  | `PlayerItem[]` | Array of battle history entries. |
| `paging` | `Paging`       | Pagination information.          |

**PlayerItem Fields:**

| Field        | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| `battleTime` | string   | ISO timestamp of the battle.  |
| `event`      | `Event`  | Event details for the battle. |
| `battle`     | `Battle` | Detailed battle information.  |

**Battle Fields:**

| Field          | Type              | Description                                 |
| -------------- | ----------------- | ------------------------------------------- |
| `mode`         | string?           | Game mode (e.g., "gemGrab", "brawlBall").   |
| `type`         | string?           | Battle type (e.g., "ranked", "friendly").   |
| `result`       | string?           | Battle outcome (e.g., "victory", "defeat"). |
| `duration`     | number?           | Battle duration in seconds.                 |
| `trophyChange` | number?           | Trophy change resulting from the battle.    |
| `starPlayer`   | `StarPlayer?`     | MVP of the battle, if applicable.           |
| `teams`        | `TeamPlayer[][]?` | Array of teams for team-based modes.        |
| `players`      | `Player[]?`       | Array of players for solo/duo modes.        |

**Event Fields:**

| Field  | Type    | Description              |
| ------ | ------- | ------------------------ |
| `id`   | number  | Event identifier.        |
| `mode` | string? | Game mode for the event. |
| `map`  | string? | Map name for the battle. |

**Notes:**

- `teams` is a nested array where each inner array represents one team.
- `starPlayer` can be null for battles without an MVP designation.
- `players` is used in solo/duo modes instead of `teams`.
- `trophyChange` indicates the trophy gain/loss from the battle.

---

## 6. Ranking Types

Types used for global ranking endpoints across players, clubs, and brawlers.

### 6.1 Global Player Rankings

```ts
export const ItemSchema = BasicRankingItemSchema.extend({
  nameColor: NameColorSchema,
  icon: IconSchema,
  club: BasicClubSchema.optional(),
});
export type Item = z.infer<typeof ItemSchema>;

export const RankingGlobalPlayersSchema = z.object({
  items: z.array(ItemSchema),
  paging: PagingSchema,
});
export type RankingGlobalPlayers = z.infer<typeof RankingGlobalPlayersSchema>;
```

**Item Fields (extends BasicRankingItem):**

| Field       | Type         | Description                 |
| ----------- | ------------ | --------------------------- |
| `nameColor` | `NameColor`  | Color code for player name. |
| `icon`      | `Icon`       | Player icon information.    |
| `club`      | `BasicClub?` | Optional club affiliation.  |

### 6.2 Global Club Rankings

```ts
export const ClubItemSchema = BasicRankingItemSchema.extend({
  badgeId: z.number(),
  memberCount: z.number(),
});
export type ClubItem = z.infer<typeof ClubItemSchema>;

export const RankingGlobalClubsSchema = z.object({
  items: z.array(ClubItemSchema),
  paging: PagingSchema,
});
export type RankingGlobalClubs = z.infer<typeof RankingGlobalClubsSchema>;
```

**ClubItem Fields (extends BasicRankingItem):**

| Field         | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| `badgeId`     | number | Club badge identifier.         |
| `memberCount` | number | Number of members in the club. |

### 6.3 Global Brawler Rankings

```ts
export const BrawlersItemSchema = BasicRankingItemSchema.extend({
  nameColor: NameColorSchema,
  icon: IconSchema,
  club: BasicClubSchema.optional(),
});
export type BrawlerItem = z.infer<typeof BrawlersItemSchema>;

export const RankingGlobalBrawlersSchema = z.object({
  items: z.array(BrawlersItemSchema),
  paging: PagingSchema,
});
export type RankingGlobalBrawlers = z.infer<typeof RankingGlobalBrawlersSchema>;
```

**BrawlerItem Fields (extends BasicRankingItem):**

| Field       | Type         | Description                 |
| ----------- | ------------ | --------------------------- |
| `nameColor` | `NameColor`  | Color code for player name. |
| `icon`      | `Icon`       | Player icon information.    |
| `club`      | `BasicClub?` | Optional club affiliation.  |

**Notes:**

- All ranking types extend `BasicRankingItem` for consistent core fields.
- Each ranking response includes pagination support via `PagingSchema`.
- Club rankings include club-specific fields like `badgeId` and `memberCount`.
- Player and brawler rankings include player-specific fields like `nameColor` and `icon`.

---

## Type Relationships

### Inheritance Hierarchy:

- `BasicRankingItem` ← `Item` (Player Rankings)
- `BasicRankingItem` ← `ClubItem` (Club Rankings)
- `BasicRankingItem` ← `BrawlerItem` (Brawler Rankings)

### Shared Dependencies:

- `IconSchema` used in: Club Members, Player Info, Ranking Items
- `PagingSchema` used in: All ranking endpoints, Battlelog
- `BasicClubSchema` used in: Player Info, Ranking Items

### Data Flow:

- **Club Types**: Used in `/clubs/:tag` endpoint
- **Player Types**: Used in `/players/:tag` endpoint
- **Battlelog Types**: Used in `/players/:tag/battlelog` endpoint
- **Ranking Types**: Used in `/rankings/players`, `/rankings/clubs`, `/rankings/brawlers` endpoints
- **Shared Types**: Provide consistency across all endpoints
