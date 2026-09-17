from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


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
    status: Literal["queued", "assigned", "delivered"]
    created_at: datetime
