# Services — API Proxy Server

## Overview

The `services` layer is responsible for managing communication between the Proxy Server and the **official Brawl Stars API**.  
It provides a centralized Axios client (`brawlApi`) configured with the base URL, authorization header, and error handling used across all controllers.  
This ensures that every controller (e.g., `players`, `clubs`, `rankings`) communicates with the external API in a consistent and secure way.

## Service Definition

```ts
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.brawlstars.com/v1";
const API_KEY = process.env.BS_API_KEY;

if (!API_KEY) {
  throw new Error("⚠️ API_KEY doesn't found");
}

export const brawlApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
```

## Functionality

| Responsibility     | Description                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Base URL**       | All requests are prefixed with the official Brawl Stars API URL (`https://api.brawlstars.com/v1`).                                     |
| **Authentication** | Uses an API key obtained from the Brawl Stars Developer Portal. This key must be stored in an environment variable named `BS_API_KEY`. |
| **Axios Instance** | Exports a configured Axios client (`brawlApi`) used by all controllers to perform requests.                                            |
| **Error Handling** | If the environment variable is missing, the service throws an error at startup to prevent invalid requests.                            |

## Usage in Controllers

Controllers import and use the `brawlApi` instance to call official endpoints.  
For example:

```ts
export const getClubInfo = async (req: Request<{ tag: string }>, res: Response) => {
  try {
    const { tag } = req.params;

    const encodeTag = encodeURIComponent(`#${tag}`);

    const response = await brawlApi.get<Club>(`/clubs/${encodeTag}`);

    if (!response) {
      return res.status(404).json({ message: "Club doesn't found", status: 404 });
    }

    const PlayerBattlelog = ClubSchema.parse(response.data);

    return res.status(200).json(PlayerBattlelog);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ClientError>;

    if (axiosError.response?.data) {
      return res.status(axiosError.response.status ?? 400).json(axiosError.response.data);
    }
    return res.status(500).json(error);
  }
};
```

This pattern ensures:

- Consistent authentication across all routes.
- Clean separation of logic between API communication and controller behavior.
- Centralized management of API configuration (base URL, headers, errors).

## Environment Variables

This service **requires one mandatory environment variable** in local development:

| Variable     | Required | Description                                                          |
| ------------ | -------- | -------------------------------------------------------------------- |
| `BS_API_KEY` | ✅ Yes   | The API key obtained from the official Brawl Stars Developer Portal. |

Without this key, the backend will fail to start.

## Notes

- This is the **only part of the backend** that depends on a local secret key.
- All other environment variables (e.g., deployment URLs for Vercel and Render) are optional and used only to configure request origins between environments.
- You can run the backend locally without deployment-related variables, as long as you have a valid `BS_API_KEY`.
