from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_list_restaurants() -> None:
    response = client.get("/api/v1/restaurants")

    assert response.status_code == 200
    assert len(response.json()) == 3
    assert response.json()[0]["id"] == "restaurant-1"

