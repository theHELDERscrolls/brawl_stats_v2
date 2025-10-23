# Rate Limiting — API Proxy Server

## Overview

The API Proxy Server implements rate limiting to protect against abuse and ensure fair usage of the Brawl Stars API resources. The rate limiter is configured as an Express middleware that restricts the number of requests a client can make within a specific time window.

## Configuration

**File:** `api-proxy-server/src/middlewares/rate-limit.ts`

```ts
import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    status: 429,
    message: "Too many request. Please, try again later",
  },
});
```

## Rate Limit Settings

| Setting           | Value               | Description                                   |
| ----------------- | ------------------- | --------------------------------------------- |
| `windowMs`        | 60000 ms (1 minute) | The time window for tracking requests         |
| `max`             | 60 requests         | Maximum number of requests allowed per window |
| `standardHeaders` | `true`              | Enables `RateLimit-*` headers in response     |
| `legacyHeaders`   | `false`             | Disables `X-RateLimit-*` headers              |
| `message`         | Custom JSON object  | Error response when limit is exceeded         |

## Headers

When `standardHeaders: true` is enabled, the following headers are included in responses:

- `RateLimit-Limit`: The maximum number of requests allowed in the window (60)
- `RateLimit-Remaining`: The number of requests remaining in the current window
- `RateLimit-Reset`: The time when the rate limit resets (Unix timestamp)

## Error Response

When a client exceeds the rate limit, they receive a `429 Too Many Requests` response with the following JSON body:

```json
{
  "ok": false,
  "status": 429,
  "message": "Too many request. Please, try again later"
}
```

## Usage

The rate limiter is applied globally to all API routes. It's imported and used in the main application setup:

```ts
import { rateLimiter } from "./middlewares/rate-limit";

// Apply to all routes
app.use(rateLimiter);

// Or apply to specific routes
app.use("/api/", rateLimiter);
```

## Rate Limit Strategy

### Current Limits

- **60 requests per minute** per client
- Based on client IP address
- Applies to all endpoints uniformly

### Considerations

- The limit is designed to prevent abuse while allowing normal usage
- Clients should implement proper error handling for 429 responses
- The 1-minute window allows for reasonable burst usage
- Future enhancements could include tiered limits per endpoint

## Best Practices for Clients

1. **Handle 429 Responses**: Implement exponential backoff when receiving rate limit errors
2. **Monitor Headers**: Use `RateLimit-Remaining` to track usage
3. **Cache Responses**: Cache frequently requested data to reduce API calls
4. **Batch Requests**: Combine related requests when possible
