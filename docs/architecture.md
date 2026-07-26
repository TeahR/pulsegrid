# Architecture

## Initial data flow

The first vertical slice will follow this path:

1. PostgreSQL stores restaurant records and geographic coordinates.
2. The API queries the database and returns restaurants over HTTP.
3. The Next.js client requests those restaurants.
4. The map renders a marker for each restaurant.

Real-time marketplace events, asynchronous workers, and analytics will be
introduced after this synchronous path works locally and in the cloud.

## Planned cloud architecture

- The web client presents the consumer experience and operations dashboard.
- A containerized API handles HTTP requests and WebSocket connections.
- PostgreSQL/PostGIS stores transactional and geospatial data.
- Pub/Sub distributes marketplace events to independent workers.
- Dispatch, recommendation, and analytics workers consume relevant events.
- Cloud Monitoring captures service health, latency, and errors.

This document will evolve as implementation decisions are made.

