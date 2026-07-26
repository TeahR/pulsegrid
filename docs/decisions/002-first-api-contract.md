# ADR 002: First API Contract

## Status

Accepted

## Context

The first feature must demonstrate the complete browser-to-API data path while
remaining small enough to understand and test.

## Decision

Create:

- `GET /health` for service health
- `GET /api/v1/restaurants` for the first domain data

Restaurant data is temporarily stored in memory. PostgreSQL will replace it
after the contract and frontend integration work.

## Alternatives

- Connect PostgreSQL immediately.
- Build the visual simulation entirely in the browser.

## Tradeoffs

In-memory data is not persistent or scalable, but it isolates the HTTP contract
and avoids debugging the UI, API, and database simultaneously. The endpoint
shape can remain stable when persistence is added.

