# PulseGrid

PulseGrid is a cloud-native, real-time marketplace operations platform. It
models orders, restaurants, drivers, and changing demand on an interactive
city map, then uses dispatch and recommendation algorithms to respond to those
events.

The simulation environment provides repeatable traffic for testing the
platform. The primary project is the event-driven system, its algorithms, and
the operational dashboard.

## First-month goal

Build and deploy a recruiter-ready beta where a visitor can:

1. Open a live city map.
2. Start a marketplace scenario.
3. Watch orders appear and drivers get assigned.
4. Trigger a demand spike such as a lunch rush.
5. See the heatmap and live operational metrics react.
6. View personalized restaurant recommendations.

## Planned stack

- Next.js and TypeScript
- Python API
- PostgreSQL with PostGIS
- WebSockets
- Google Cloud Run and Pub/Sub
- Docker and GitHub Actions

The stack is provisional until each major choice is recorded in
`docs/decisions/`.

## Repository status

PulseGrid is in active development. The first milestone is a deployed vertical
slice that loads restaurant locations from PostgreSQL through the API and
displays them on the map.

## Documentation

- [Architecture](docs/architecture.md)
- [Interview notes](docs/interview-notes.md)
- [Project decisions](docs/decisions/)

