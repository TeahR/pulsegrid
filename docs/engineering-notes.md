# Engineering Notes

Use this document to record how the system works, why major decisions were
made, and what was learned while implementing each feature.

## Project explanation

PulseGrid is a cloud-based marketplace operations platform that processes
geospatial events in real time. Its simulation environment generates
repeatable demand so dispatch and recommendation strategies can be tested
under controlled conditions.

## Design review questions

1. What problem does PulseGrid solve?
2. How does an order move through the system?
3. Why does the project use PostgreSQL and PostGIS?
4. Why are some operations synchronous and others event-driven?
5. How does the dispatch algorithm choose a driver?
6. How does the system handle duplicate or failed events?
7. What did load testing reveal?
8. How would the design change at 100 times the traffic?
