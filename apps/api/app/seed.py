from sqlalchemy import select

from app.database import SessionLocal
from app.models import Restaurant


RESTAURANTS = [
    Restaurant(
        id="restaurant-1",
        name="Northstar Kitchen",
        cuisine="New American",
        neighborhood="Downtown",
        latitude=40.7128,
        longitude=-74.0060,
    ),
    Restaurant(
        id="restaurant-2",
        name="Saffron Route",
        cuisine="Indian",
        neighborhood="Midtown",
        latitude=40.7549,
        longitude=-73.9840,
    ),
    Restaurant(
        id="restaurant-3",
        name="Verde Street",
        cuisine="Mexican",
        neighborhood="Lower East Side",
        latitude=40.7180,
        longitude=-73.9885,
    ),
]


def seed() -> None:
    with SessionLocal.begin() as session:
        existing_ids = set(session.scalars(select(Restaurant.id)))
        session.add_all(
            restaurant
            for restaurant in RESTAURANTS
            if restaurant.id not in existing_ids
        )


if __name__ == "__main__":
    seed()
