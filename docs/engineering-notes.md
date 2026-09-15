# Engineering Notes

Use this document to record how the system works, why major decisions were
made, and what was learned while implementing each feature.

## Project explanation

PulseGrid is a cloud-based marketplace operations platform that processes
geospatial events in real time. Its simulation environment generates
repeatable demand so dispatch and recommendation strategies can be tested
under controlled conditions.

## Automated verification

The default API tests use isolated SQLite tables for fast, repeatable feedback.
That does not establish compatibility with PostgreSQL. A separate GitHub
Actions check starts disposable PostgreSQL, applies the actual migrations,
checks model/schema consistency, and verifies seeded records through FastAPI
without replacing its database dependency. Running the seed twice catches
duplicate-record failures. Frontend lint and builds run in a separate job so
neither side has to wait for the other.

These checks verify current behavior, not dispatch correctness, load capacity,
or visual layout. Those need their own tests as those features are implemented.

## Design review questions

1. What problem does PulseGrid solve?
2. How does an order move through the system?
3. Why does the project use PostgreSQL and PostGIS?
4. Why are some operations synchronous and others event-driven?
5. How does the dispatch algorithm choose a driver?
6. How does the system handle duplicate or failed events?
7. What did load testing reveal?
8. How would the design change at 100 times the traffic?
