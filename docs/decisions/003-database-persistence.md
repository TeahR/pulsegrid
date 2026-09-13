# ADR 003: Database Persistence

## Status

Accepted

## Context

The in-memory restaurant list disappears when the API restarts and cannot be
shared reliably by multiple API instances. PulseGrid also needs geographic
queries in later milestones.

## Decision

Use PostgreSQL as the production database, SQLAlchemy 2 for object-relational
mapping, Psycopg as the PostgreSQL driver, and Alembic for schema migrations.
Keep synchronous database access for the initial API because its traffic and
query patterns do not yet justify asynchronous database code.

Tests replace the production database dependency with an isolated in-memory
SQLite database. This keeps unit-level API tests fast; PostgreSQL integration
tests will be added when PostGIS-specific behavior is introduced.

## Alternatives

- Raw SQL would reduce abstraction but require more manual row mapping and
  connection management.
- An asynchronous database stack could support more concurrent waiting, but
  would add complexity before the application has measured that need.
- SQLite would simplify local development but does not provide the same
  concurrency or geospatial path as PostgreSQL with PostGIS.

## Tradeoffs

The ORM and migration tool add dependencies and concepts. In return, schema
changes are reproducible, database sessions have a consistent lifecycle, and
models remain portable between local PostgreSQL and Cloud SQL. SQLite tests do
not perfectly reproduce PostgreSQL behavior, so database-specific features
will require separate integration coverage.
