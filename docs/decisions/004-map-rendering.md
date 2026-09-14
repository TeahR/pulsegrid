# ADR 004: Map Rendering

## Status

Accepted

## Context

PulseGrid needs an interactive map for restaurant, demand, and driver data. The
initial release should not require developers to purchase a map plan or manage
an API key.

## Decision

Use MapLibre GL JS as the client-side map renderer and OpenFreeMap's public
tiles with OpenStreetMap data. Keep restaurant data separate from the map
provider so changing the base-map service does not change the API contract.

## Alternatives

- Mapbox provides a polished managed platform but requires an account, token,
  and usage-based billing.
- Leaflet is smaller and simpler for basic markers but is less suitable for the
  vector styling and large dynamic layers planned for the operations view.

## Tradeoffs

MapLibre is open source and provider-independent, while OpenFreeMap requires no
API key and includes map attribution automatically. Its public service does not
provide a commercial service-level agreement, so a production deployment may
eventually use a managed provider or self-hosted tiles.
