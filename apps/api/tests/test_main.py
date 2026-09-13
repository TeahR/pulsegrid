from collections.abc import Generator

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.models import Restaurant


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
