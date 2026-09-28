from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict

OrderStatus = Literal["queued", "assigned", "delivered"]


class RestaurantRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    cuisine: str
    neighborhood: str
    latitude: float
    longitude: float


class OrderRead(BaseModel):
    id: str
    restaurant_name: str
    status: OrderStatus
    created_at: datetime
