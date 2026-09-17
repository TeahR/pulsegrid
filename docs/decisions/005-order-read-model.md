# ADR 005: First Order Read Model

## Status

Accepted

## Context

The dashboard previously displayed a hard-coded active-order count and empty
activity table. The simulation will eventually create and update orders, but
the database and API contract need to exist first.

## Decision

Store orders in PostgreSQL with a restaurant foreign key, creation time, and
one of three statuses: queued, assigned, or delivered. A migration defines the
table and a database constraint limits valid statuses. The read-only API joins
the restaurant name into each response and returns newest orders first. The
dashboard counts non-delivered orders and labels seeded rows as demo records.

## Tradeoffs

The read endpoint is intentionally simple: it has no pagination, write path,
or event history yet. Seeded orders stay in their initial status until the
simulation and dispatch workflow are implemented. Returning the restaurant
name avoids a second browser request, but it duplicates that name in the API
response. A separate event model may be warranted once orders can change.
