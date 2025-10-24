# Endpoints — API Proxy Server

## Clubs

### `GET /clubs/:tag`

Fetch detailed information about a Brawl Stars club by its tag. This endpoint uses the **Club Controller** to request data from the official Brawl Stars API, validate it, and return it in a consistent JSON format.

**URL Parameters:**

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| `tag`     | string | The unique tag of the club (without `#`). |

**Request Example:**

```http
GET /clubs/%Y0G8R2 HTTP/1.1
Host: localhost:3000
```

**Successful Response (200 OK):**

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

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Club doesn't found", "status": 404 }`                   | Club not found in the official API.   |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- The club tag is encoded (`encodeURIComponent`) before making the request to ensure special characters are handled.
- All responses are validated against `ClubSchema` before being sent to the client.
- The `members` array contains all club members with detailed fields (`tag`, `name`, `role`, `trophies`, `icon`).

---

## Players

### `GET /players/:tag`

Fetch detailed information about a Brawl Stars player by their tag.  
This endpoint is handled by the **Player Controller** and retrieves player data (trophies, brawlers, victories, and club info) directly from the official Brawl Stars API.  
The response is validated using `PlayerInfoSchema` before returning a consistent JSON structure.

**URL Parameters:**

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `tag`     | string | The unique tag of the player (without `#`). |

**Request Example:**

```http
GET /players/%22P0Q9 HTTP/1.1
Host: localhost:3000
```

**Successful Response (200 OK):**

```json
{
  "tag": "#22P0Q9",
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

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Player doesn't found", "status": 404 }`                 | Player not found in the official API. |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- The player tag is URL-encoded (`encodeURIComponent`) before making the API request to ensure `#` and special characters are handled properly.
- The response is validated using `PlayerInfoSchema` from Zod.
- The `brawlers` array lists all brawlers owned by the player with fields for trophies, power, rank, gears, gadgets, and star powers.

---

### `GET /players/:tag/battlelog`

Fetch the recent battle history of a Brawl Stars player.  
This endpoint is handled by the **Player Controller** and retrieves match history directly from the Brawl Stars API.  
The response is validated using `PlayerBattlelogSchema` to ensure type consistency.

**URL Parameters:**

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `tag`     | string | The unique tag of the player (without `#`). |

**Request Example:**

```http
GET /players/%22P0Q9/battlelog HTTP/1.1
Host: localhost:3000
```

**Successful Response (200 OK):**

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
          "tag": "#22P0Q9",
          "name": "Player1",
          "brawler": {
            "id": 1,
            "name": "Shelly",
            "power": 10,
            "trophies": 500
          }
        },
        "teams": [],
        "players": []
      }
    }
  ],
  "paging": {}
}
```

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Player doesn't found", "status": 404 }`                 | Player not found in the official API. |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- The battle log includes a list of recent matches with timestamps, event info, and detailed battle outcomes.
- Each entry contains the `event` object (map, mode) and the `battle` object (type, result, duration, star player, and teams).
- Responses are fully validated through `PlayerBattlelogSchema`.
- Tags are encoded with `encodeURIComponent("#" + tag)` before the API request.

---

## Rankings

### `GET /rankings/global/clubs`

Fetch the global club rankings from the Brawl Stars API.  
This endpoint is handled by the **Rankings Controller** and retrieves a list of top clubs worldwide.  
Each club includes information such as name, tag, trophies, badge, and member count.  
The response is validated using `RankingGlobalClubsSchema` to ensure type consistency.

**Request Example:**

`GET /rankings/global/clubs HTTP/1.1 Host: localhost:3000`

**Successful Response (200 OK):**

`{   "items": [     {       "tag": "#Y0G8R2",       "name": "Top Club",       "trophies": 123456,       "badgeId": 28000012,       "memberCount": 30,       "rank": 1     },     {       "tag": "#L9Z8J0",       "name": "Second Club",       "trophies": 120000,       "badgeId": 28000005,       "memberCount": 29,       "rank": 2     }   ],   "paging": {     "cursors": {}   } }`

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Ranking doesn't found", "status": 404 }`                | Ranking data not found in the API.    |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- Returns a list of clubs globally ranked by total trophies.
- Each club entry includes its `tag`, `name`, `trophies`, `badgeId`, and `memberCount`.
- All data is validated through `RankingGlobalClubsSchema` before being sent to the client.

### `GET /rankings/global/brawlers/:brawlerId`

Fetch the global player rankings for a specific brawler.  
This endpoint is handled by the **Rankings Controller** and retrieves the top players using a given brawler ID.  
The response is validated using `RankingGlobalBrawlersSchema` to ensure proper typing.

**URL Parameters:**

| Parameter   | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| `brawlerId` | string | The unique ID of the brawler to get rankings for. |

**Request Example:**

`GET /rankings/global/brawlers/16000000 HTTP/1.1 Host: localhost:3000`

**Successful Response (200 OK):**

`{   "items": [     {       "tag": "#22P0Q9",       "name": "Player1",       "trophies": 1100,       "nameColor": "blue",       "icon": { "id": 1500003 },       "rank": 1,       "club": { "name": "Elite Club" }     },     {       "tag": "#8Y9Z0X",       "name": "Player2",       "trophies": 1090,       "nameColor": "red",       "icon": { "id": 1500010 },       "rank": 2,       "club": { "name": "Champions" }     }   ],   "paging": {     "cursors": {}   } }`

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Ranking doesn't found", "status": 404 }`                | Ranking data not found in the API.    |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- Requires a valid `brawlerId` to fetch rankings for that specific brawler.
- Each ranking entry contains player details (`tag`, `name`, `trophies`, `rank`, `icon`, and `club`).
- The data is parsed and validated using `RankingGlobalBrawlersSchema`.

### `GET /rankings/global/players`

Fetch the global player rankings from the Brawl Stars API.  
This endpoint is handled by the **Rankings Controller** and retrieves the top players worldwide based on total trophies.  
The response is validated using `RankingGlobalPlayersSchema` to ensure type correctness.

**Request Example:**

```http
GET /rankings/global/clubs HTTP/1.1
Host: localhost:3000
```

**Successful Response (200 OK):**

```json
{
  "items": [
    {
      "tag": "#Y0G8R2",
      "name": "Top Club",
      "trophies": 123456,
      "badgeId": 28000012,
      "memberCount": 30,
      "rank": 1
    },
    {
      "tag": "#L9Z8J0",
      "name": "Second Club",
      "trophies": 120000,
      "badgeId": 28000005,
      "memberCount": 29,
      "rank": 2
    }
  ],
  "paging": {
    "cursors": {}
  }
}
```

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Ranking doesn't found", "status": 404 }`                | Ranking data not found in the API.    |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- Returns a list of globally ranked players sorted by their total trophies.
- Each entry includes player details (`tag`, `name`, `trophies`, `rank`, `icon`, `club`).
- All responses are validated using `RankingGlobalPlayersSchema` before being returned.

### `GET /rankings/global/brawlers/:brawlerId`

Fetch the global player rankings for a specific brawler.  
This endpoint is handled by the **Rankings Controller** and retrieves the top players using a given brawler ID.  
The response is validated using `RankingGlobalBrawlersSchema` to ensure proper typing.

**URL Parameters:**

| Parameter   | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| `brawlerId` | string | The unique ID of the brawler to get rankings for. |

**Request Example:**

```http
GET /rankings/global/brawlers/16000000 HTTP/1.1
Host: localhost:3000
```

**Successful Response (200 OK):**

```json
{
  "items": [
    {
      "tag": "#22P0Q9",
      "name": "Player1",
      "trophies": 1100,
      "nameColor": "blue",
      "icon": { "id": 1500003 },
      "rank": 1,
      "club": { "name": "Elite Club" }
    },
    {
      "tag": "#8Y9Z0X",
      "name": "Player2",
      "trophies": 1090,
      "nameColor": "red",
      "icon": { "id": 1500010 },
      "rank": 2,
      "club": { "name": "Champions" }
    }
  ],
  "paging": {
    "cursors": {}
  }
}
```

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Ranking doesn't found", "status": 404 }`                | Ranking data not found in the API.    |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- Requires a valid `brawlerId` to fetch rankings for that specific brawler.
- Each ranking entry contains player details (`tag`, `name`, `trophies`, `rank`, `icon`, and `club`).
- The data is parsed and validated using `RankingGlobalBrawlersSchema`.

### `GET /rankings/global/players`

Fetch the global player rankings from the Brawl Stars API.  
This endpoint is handled by the **Rankings Controller** and retrieves the top players worldwide based on total trophies.  
The response is validated using `RankingGlobalPlayersSchema` to ensure type correctness.

**Request Example:**

```http
GET /rankings/global/players HTTP/1.1
Host: localhost:3000
```

**Successful Response (200 OK):**

```json
{
  "items": [
    {
      "tag": "#22P0Q9",
      "name": "TopPlayer",
      "trophies": 70000,
      "nameColor": "blue",
      "icon": { "id": 1500003 },
      "rank": 1,
      "club": { "name": "Elite Club" }
    },
    {
      "tag": "#8Y9Z0X",
      "name": "SecondBest",
      "trophies": 69500,
      "nameColor": "green",
      "icon": { "id": 1500011 },
      "rank": 2,
      "club": { "name": "Legends" }
    }
  ],
  "paging": {
    "cursors": {}
  }
}
```

**Error Responses:**

| Status | Body                                                                   | Description                           |
| ------ | ---------------------------------------------------------------------- | ------------------------------------- |
| 404    | `{ "message": "Ranking doesn't found", "status": 404 }`                | Ranking data not found in the API.    |
| 400+   | `{ "reason": "BadRequest", "message": "...", "type": "client_error" }` | Error returned from the official API. |
| 500    | `{ "error": "Internal Server Error" }`                                 | Unexpected server error in the proxy. |

**Notes:**

- Returns a list of globally ranked players sorted by their total trophies.
- Each entry includes player details (`tag`, `name`, `trophies`, `rank`, `icon`, `club`).
- All responses are validated using `RankingGlobalPlayersSchema` before being returned.
