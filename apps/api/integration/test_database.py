"""Run separately against a migrated, twice-seeded disposable database."""

from fastapi.testclient import TestClient

from app.main import app


def test_api_reads_seeded_database() -> None:
    # No dependency override: this exercises the configured database connection.
    with TestClient(app) as client:
        response = client.get("/api/v1/restaurants")

    assert response.status_code == 200
    restaurants = response.json()
    assert [restaurant["name"] for restaurant in restaurants] == [
        "Northstar Kitchen",
        "Saffron Route",
        "Verde Street",
    ]
    assert len({restaurant["id"] for restaurant in restaurants}) == 3
    assert all(-90 <= restaurant["latitude"] <= 90 for restaurant in restaurants)
    assert all(-180 <= restaurant["longitude"] <= 180 for restaurant in restaurants)
