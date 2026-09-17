from collections.abc import Generator
from datetime import datetime, timezone

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models import Order, Restaurant


engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)


def override_get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def setup_function() -> None:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_list_restaurants() -> None:
    with Session(engine) as session:
        session.add(
            Restaurant(
                id="restaurant-1",
                name="Northstar Kitchen",
                cuisine="New American",
                neighborhood="Downtown",
                latitude=40.7128,
                longitude=-74.0060,
            )
        )
        session.commit()

    response = client.get("/api/v1/restaurants")

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": "restaurant-1",
            "name": "Northstar Kitchen",
            "cuisine": "New American",
            "neighborhood": "Downtown",
            "latitude": 40.7128,
            "longitude": -74.006,
        }
    ]


def test_list_restaurants_returns_empty_list_without_rows() -> None:
    response = client.get("/api/v1/restaurants")

    assert response.status_code == 200
    assert response.json() == []


def test_list_orders_includes_restaurant_and_newest_first() -> None:
    with Session(engine) as session:
        session.add(
            Restaurant(
                id="restaurant-1",
                name="Northstar Kitchen",
                cuisine="New American",
                neighborhood="Downtown",
                latitude=40.7128,
                longitude=-74.0060,
            )
        )
        session.add_all(
            [
                Order(
                    id="order-1",
                    restaurant_id="restaurant-1",
                    status="assigned",
                    created_at=datetime(2026, 9, 17, 12, 0, tzinfo=timezone.utc),
                ),
                Order(
                    id="order-2",
                    restaurant_id="restaurant-1",
                    status="queued",
                    created_at=datetime(2026, 9, 17, 12, 5, tzinfo=timezone.utc),
                ),
            ]
        )
        session.commit()

    response = client.get("/api/v1/orders")

    assert response.status_code == 200
    assert [(order["id"], order["restaurant_name"], order["status"]) for order in response.json()] == [
        ("order-2", "Northstar Kitchen", "queued"),
        ("order-1", "Northstar Kitchen", "assigned"),
    ]


def test_list_orders_returns_empty_list_without_rows() -> None:
    response = client.get("/api/v1/orders")

    assert response.status_code == 200
    assert response.json() == []
