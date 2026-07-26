from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Restaurant(BaseModel):
    id: str
    name: str
    cuisine: str
    neighborhood: str
    latitude: float
    longitude: float


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


@app.get("/api/v1/restaurants", response_model=list[Restaurant])
def list_restaurants() -> list[Restaurant]:
    return RESTAURANTS

