# PulseGrid

PulseGrid is a cloud-native, real-time marketplace operations platform. It
models orders, restaurants, drivers, and changing demand on an interactive
city map, then uses dispatch and recommendation algorithms to respond to those
events.

The simulation environment provides repeatable traffic for testing the
platform. The primary project is the event-driven system, its algorithms, and
the operational dashboard.

## Initial release goal

Build and deploy a working beta where a visitor can:

1. Open a live city map.
2. Start a marketplace scenario.
3. Watch orders appear and drivers get assigned.
4. Trigger a demand spike such as a lunch rush.
5. See the heatmap and live operational metrics react.
6. View personalized restaurant recommendations.

## Planned stack

- Next.js, TypeScript, and MapLibre
- Python API
- PostgreSQL with PostGIS
- WebSockets
- Google Cloud Run and Pub/Sub
- Docker and GitHub Actions

Major technical choices and their tradeoffs are recorded in `docs/decisions/`.

## Local API setup

Create and activate a Python virtual environment, then install the API
dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r apps/api/requirements-dev.txt
```

Create a local PostgreSQL database, apply the schema migration, and load the
demo restaurants:

```bash
createdb pulsegrid
cd apps/api
../../.venv/bin/alembic upgrade head
PYTHONPATH=. ../../.venv/bin/python -m app.seed
../../.venv/bin/uvicorn app.main:app --reload
```

If PostgreSQL requires credentials or runs elsewhere, export `DATABASE_URL`
before running the migration, seed, and server commands. The expected format is
shown in `apps/api/.env.example`.

## Repository status

PulseGrid is in active development. The first milestone is a deployed vertical
slice that loads restaurant locations from PostgreSQL through the API and
displays them on the map.

## Automated checks

GitHub Actions runs frontend lint and a production build, API unit tests, and
a PostgreSQL integration check on pushes to `main` and pull requests. The
database check applies migrations, checks for schema drift, seeds twice to
verify repeatability, and reads the stored records through the API.

Run the fast checks locally:

```bash
npm run lint:web
npm run build:web
.venv/bin/pytest
```

The integration test is separate from the default test suite. Run it only
against a disposable database after applying migrations and seeding twice:

```bash
PYTHONPATH=apps/api .venv/bin/pytest apps/api/integration
```

Set `DATABASE_URL` to that database for the migration, seed, and test commands.

## Documentation

- [One-month product specification](docs/product-spec.md)
- [Architecture](docs/architecture.md)
- [Engineering notes](docs/engineering-notes.md)
- [Project decisions](docs/decisions/)
