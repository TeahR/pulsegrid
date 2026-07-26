# ADR 001: Application Structure

## Status

Accepted

## Context

PulseGrid needs a highly interactive frontend, a cloud-deployable API, and a
clear path to Python-based ranking and forecasting. The first-month version
must remain understandable to one developer.

## Decision

Use a monorepo containing:

- `apps/web`: Next.js with TypeScript
- `apps/api`: FastAPI with Python

Keep the API as a modular monolith initially. Extract workers only when
asynchronous event processing creates a real boundary.

## Alternatives

- A TypeScript-only stack would reduce the number of languages.
- Multiple microservices would resemble a larger production system.

## Tradeoffs

Using two languages increases setup and cognitive load, but Python provides a
direct path to later data and ML work. A modular monolith has less operational
overhead than microservices, but modules must maintain deliberate boundaries.

