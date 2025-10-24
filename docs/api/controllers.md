# Controllers — API Proxy Server

## Club Controller

**File:** `club.controller.ts`  
**Purpose:** Handles requests related to Brawl Stars clubs. Provides a secure intermediary layer between the frontend and the official Brawl Stars API, validating responses and returning structured data.

### Dependencies

- `express` — For handling HTTP requests and responses.
- `brawlApi` — Axios instance configured to access the Brawl Stars API.
- `Zod` (`ClubSchema`) — Validates and parses API responses.
- `AxiosError` — For type-safe error handling.
- Types: `Club`, `ClientError`.

### Responsibilities

The **Club Controller** currently provides a single endpoint:

- `GET /clubs/:tag` — Fetches detailed information about a club based on its tag.
  **Behavior:**

1. Encodes the club tag for safe use in the URL (`encodeURIComponent("#" + tag)`).
2. Calls the Brawl Stars API via `brawlApi.get<Club>()`.
3. Validates the API response with `ClubSchema` to ensure correct typing.
4. Returns the parsed club object as JSON.
5. Handles errors:
      - If the club is not found, responds with `404`.
      - If the Brawl Stars API returns an error, passes it through.
      - For unexpected errors, responds with `500`.

### Example Response (JSON) — Club

```json
{
  "tag": "#Y0G8R2",
  "name": "Example Club",
  "description": "A sample club description.",
  "type": "open",
  "badgeId": 12345,
  "requiredTrophies": 500,
  "trophies": 15000,
  "members": [
    {
      "tag": "#PLAYER1",
      "name": "Player1",
      "nameColor": "blue",
      "role": "member",
      "trophies": 2000,
      "icon": {
        "id": 1500003
      }
    }
  ]
}
```

**Notes:**

- The controller ensures the club tag is properly encoded before calling the API.
- All returned data is validated via `ClubSchema` to avoid type inconsistencies.
- The `members` array includes all club members with their tag, name, role, trophies, and icon.

---

## Players Controller

**File:** `player.controller.ts`  
**Purpose:** Handles requests related to Brawl Stars players. Provides an intermediary layer between the frontend and the official Brawl Stars API, validating responses and returning structured data. This controller manages endpoints for player profile information and battle logs.

### Dependencies

- `express` — For handling HTTP requests and responses.
- `brawlApi` — Axios instance configured to access the Brawl Stars API.
- `Zod` (`PlayerInfoSchema`, `PlayerBattlelogSchema`) — Validates and parses API responses.
- `AxiosError` — For type-safe error handling.
- Types: `PlayerInfo`, `PlayerBattlelog`, `ClientError`.

### Responsibilities

The **Players Controller** currently provides the following endpoints:

- `GET /players/:tag` — Fetches detailed information about a player by their tag.
- `GET /players/:tag/battlelog` — Fetches the recent battle log of a player.
  **Behavior:**

1. Encodes the player tag for safe use in the URL (`encodeURIComponent("#" + tag)`).
2. Calls the Brawl Stars API via `brawlApi.get<PlayerInfo>()` or `brawlApi.get<PlayerBattlelog>()`.
3. Validates the API response using `PlayerInfoSchema` or `PlayerBattlelogSchema` to ensure correct typing.
4. Returns the parsed player object or battle log as JSON.
5. Handles errors:
   - If the player is not found, responds with `404`.
   - If the Brawl Stars API returns an error, passes it through.
   - For unexpected errors, responds with `500`.

### Example Response (JSON) — Player Info

```json
{
  "tag": "#PLAYER1",
  "name": "Player1",
  "nameColor": "blue",
  "icon": { "id": 1500003 },
  "trophies": 12345,
  "highestTrophies": 15000,
  "expLevel": 100,
  "expPoints": 50000,
  "isQualifiedFromChampionshipChallenge": false,
  "3vs3Victories": 100,
  "soloVictories": 50,
  "duoVictories": 25,
  "bestRoboRumbleTime": 180,
  "bestTimeAsBigBrawler": 200,
  "club": {
    "tag": "#CLUB1",
    "name": "Example Club"
  },
  "brawlers": [
    {
      "id": 1,
      "name": "Shelly",
      "power": 10,
      "rank": 25,
      "trophies": 500,
      "highestTrophies": 550,
      "gears": [],
      "starPowers": [],
      "gadgets": []
    }
  ]
}
```

### Example Response (JSON) — Player Battlelog

```json
{
  "items": [
    {
      "battleTime": "2025-10-23T12:00:00Z",
      "event": {
        "id": 1,
        "mode": "Gem Grab",
        "map": "Crystal Cavern"
      },
      "battle": {
        "mode": "Gem Grab",
        "type": "ranked",
        "result": "victory",
        "duration": 180,
        "trophyChange": 10,
        "starPlayer": {
          "tag": "#PLAYER1",
          "name": "Player1",
          "brawler": { "id": 1, "name": "Shelly", "power": 10, "trophies": 500 }
        },
        "teams": [],
        "players": []
      }
    }
  ],
  "paging": {}
}
```

### Notes

- Player tags are encoded before making API requests to ensure special characters are handled.
- All responses are validated via `PlayerInfoSchema` and `PlayerBattlelogSchema` to avoid type inconsistencies.
- The `brawlers` array in `PlayerInfo` contains all brawlers owned by the player with detailed fields (`id`, `name`, `power`, `rank`, `trophies`, `gears`, `starPowers`, `gadgets`).
- Battle log items include `event` and `battle` details, with optional fields for teams and star players.

---

## Rankings Controller

**File:** `ranking.controller.ts`  
**Purpose:** Handles requests related to global rankings in Brawl Stars, including top clubs, players, and brawlers. This controller provides a unified interface between the frontend and the official Brawl Stars API, ensuring all ranking data is validated and returned in a consistent format.

### Dependencies

- `express` — For handling HTTP requests and responses.
- `brawlApi` — Axios instance configured to access the Brawl Stars API.
- `Zod` (`RankingGlobalClubsSchema`, `RankingGlobalPlayersSchema`, `RankingGlobalBrawlersSchema`) — Validates and parses API responses.
- `AxiosError` — For type-safe error handling.
- Types: `RankingGlobalClubs`, `RankingGlobalPlayers`, `RankingGlobalBrawlers`, `ClientError`.

### Responsibilities

The **Rankings Controller** provides three main endpoints:

#### 1. `GET /rankings/global/clubs`

Fetches the **global club rankings** from the Brawl Stars API.

**Behavior:**

1. Calls the Brawl Stars API via `brawlApi.get<RankingGlobalClubs>("/rankings/global/clubs")`.
2. Validates the response with `RankingGlobalClubsSchema`.
3. Returns the parsed club rankings as JSON.
4. Handles errors:

   - If the ranking is not found, responds with `404`.
   - If the Brawl Stars API returns an error, passes it through.
   - For unexpected errors, responds with `500`.

#### 2. `GET /rankings/global/players`

Fetches the **global player rankings** from the Brawl Stars API.

**Behavior:**

1. Calls the Brawl Stars API via `brawlApi.get<RankingGlobalPlayers>("/rankings/global/players")`.
2. Validates the response with `RankingGlobalPlayersSchema`.
3. Returns the parsed player rankings as JSON.
4. Handles errors in the same pattern as other endpoints.

#### 3. `GET /rankings/global/brawlers/:brawlerId`

Fetches the **global rankings for a specific brawler**.

**Behavior:**

1. Extracts `brawlerId` from the request parameters.
2. Calls the Brawl Stars API via `brawlApi.get<RankingGlobalBrawlers>(\`/rankings/global/brawlers/${brawlerId}`)`.
3. Validates the response using `RankingGlobalBrawlersSchema`.
4. Returns the parsed brawler-specific ranking data.
5. Handles errors consistently using `AxiosError`.

### Example Response (JSON) — Club Rankings

```json
{
  "items": [
    {
      "tag": "#CLUB1",
      "name": "Top Club",
      "trophies": 90000,
      "badgeId": 1500003,
      "memberCount": 30,
      "rank": 1
    },
    {
      "tag": "#CLUB2",
      "name": "Next Club",
      "trophies": 85000,
      "badgeId": 1500004,
      "memberCount": 30
    }
  ],
  "paging": {
    "cursors": {}
  }
}
```

### Example Response (JSON) — Player Rankings

```json
{
  "items": [
    {
      "tag": "#PLAYER1",
      "name": "ProPlayer",
      "trophies": 35000,
      "nameColor": "blue",
      "icon": { "id": 1500003 },
      "rank": 1,
      "club": { "name": "Top Club" }
    },
    {
      "tag": "#PLAYER2",
      "name": "BrawlerX",
      "trophies": 34000,
      "nameColor": "red",
      "icon": { "id": 1500004 }
    }
  ],
  "paging": {
    "cursors": {}
  }
}
```

### Example Response (JSON) — Brawler Rankings

```json
{
  "items": [
    {
      "tag": "#PLAYER1",
      "name": "ShellyMaster",
      "trophies": 1250,
      "nameColor": "purple",
      "icon": { "id": 1500005 },
      "rank": 1,
      "club": { "name": "Power Squad" }
    },
    {
      "tag": "#PLAYER2",
      "name": "ShotgunPro",
      "trophies": 1240,
      "nameColor": "blue",
      "icon": { "id": 1500006 }
    }
  ],
  "paging": {
    "cursors": {}
  }
}
```

### Notes

- Each ranking endpoint returns an object with `items` (ranking entries) and a `paging` object.
- The `paging.cursors` field is included for future pagination support but is currently an empty object.
- The controller guarantees that all data returned from the API conforms to the schemas:
  - `RankingGlobalClubsSchema` for `/clubs`
  - `RankingGlobalPlayersSchema` for `/players`
  - `RankingGlobalBrawlersSchema` for `/brawlers/:brawlerId`
- `rank` is optional because not all API responses include this field (e.g., partial ranking snapshots).
- Each ranking entry may optionally include a `club` field (for players and brawlers) containing only the club name.
- Error handling is consistent across endpoints, returning `ClientError` objects for known API errors and `500` for unexpected failures.

---
