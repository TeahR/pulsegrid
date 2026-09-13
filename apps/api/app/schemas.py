from pydantic import BaseModel, ConfigDict


class RestaurantRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    cuisine: str
    neighborhood: str
    latitude: float
    longitude: float
