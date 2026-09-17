from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Order, Restaurant
from app.schemas import OrderRead, RestaurantRead

app = FastAPI(
    title="PulseGrid API",
    version="0.1.0",
    description="Marketplace operations API for PulseGrid.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/v1/restaurants", response_model=list[RestaurantRead])
def list_restaurants(db: Session = Depends(get_db)) -> list[Restaurant]:
    return list(db.scalars(select(Restaurant).order_by(Restaurant.name)))


@app.get("/api/v1/orders", response_model=list[OrderRead])
def list_orders(db: Session = Depends(get_db)) -> list[OrderRead]:
    rows = db.execute(
        select(Order, Restaurant.name)
        .join(Restaurant, Order.restaurant_id == Restaurant.id)
        .order_by(Order.created_at.desc(), Order.id)
    )
    return [
        OrderRead(
            id=order.id,
            restaurant_name=restaurant_name,
            status=order.status,
            created_at=order.created_at,
        )
        for order, restaurant_name in rows
    ]
