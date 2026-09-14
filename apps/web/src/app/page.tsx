import { CityMap } from "./CityMap";
import type { Restaurant } from "@/lib/types";

type RestaurantResponse = {
  restaurants: Restaurant[];
  apiAvailable: boolean;
};

async function getRestaurants(): Promise<RestaurantResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  try {
    const response = await fetch(`${apiUrl}/api/v1/restaurants`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Restaurant request failed: ${response.status}`);
    }

    return { restaurants: await response.json(), apiAvailable: true };
  } catch {
    return { restaurants: [], apiAvailable: false };
  }
}

export default async function Home() {
  const { restaurants, apiAvailable } = await getRestaurants();

  return (
    <>
      <header className="topbar">
        <div className="topbarInner">
          <a className="brand" href="#overview">
            <span className="brandMark" aria-hidden="true">PG</span>
            PulseGrid
          </a>

          <nav aria-label="Primary navigation">
            <a className="active" href="#overview">Overview</a>
            <a href="#locations">Locations</a>
            <a href="#activity">Activity</a>
          </nav>

          <div className={`connection ${apiAvailable ? "online" : ""}`}>
            <span aria-hidden="true" />
            {apiAvailable ? "API connected" : "API unavailable"}
          </div>
        </div>
      </header>

      <main className="dashboard" id="overview">
        <section className="pageHeading">
          <div>
            <p className="eyebrow">Marketplace operations</p>
            <h1>Operations overview</h1>
            <p>Monitor restaurant coverage and marketplace activity across New York City.</p>
          </div>
          <span className="environmentLabel">Development environment</span>
        </section>

        <section className="metricGrid" aria-label="Marketplace summary">
          <article>
            <span>Connected restaurants</span>
            <strong>{restaurants.length}</strong>
            <small>{apiAvailable ? "Live API data" : "Waiting for API"}</small>
          </article>
          <article>
            <span>Active orders</span>
            <strong>0</strong>
            <small>No orders in progress</small>
          </article>
          <article>
            <span>Median delivery time</span>
            <strong>—</strong>
            <small>Available after simulation</small>
          </article>
        </section>

        <section className="primaryGrid" id="locations">
          <article className="panel mapPanel">
            <div className="panelHeader">
              <div>
                <h2>Restaurant coverage</h2>
                <p>Current marketplace locations</p>
              </div>
              <span>{restaurants.length} mapped</span>
            </div>
            <CityMap restaurants={restaurants} />
          </article>

          <aside className="panel locationsPanel">
            <div className="panelHeader">
              <div>
                <h2>Restaurants</h2>
                <p>Location directory</p>
              </div>
            </div>

            <div className="restaurantList">
              {restaurants.length ? (
                restaurants.map((restaurant) => (
                  <article className="restaurant" key={restaurant.id}>
                    <span className="restaurantInitial" aria-hidden="true">
                      {restaurant.name.charAt(0)}
                    </span>
                    <div>
                      <strong>{restaurant.name}</strong>
                      <span>{restaurant.cuisine} · {restaurant.neighborhood}</span>
                    </div>
                  </article>
                ))
              ) : (
                <p className="emptyState">Start the API to load restaurant records.</p>
              )}
            </div>
          </aside>
        </section>

        <section className="panel activityPanel" id="activity">
          <div className="panelHeader">
            <div>
              <h2>Recent activity</h2>
              <p>Order and dispatch events will appear here</p>
            </div>
          </div>
          <div className="tableWrapper">
            <table>
              <thead>
                <tr><th>Time</th><th>Event</th><th>Location</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="tableEmpty">
                    No marketplace activity yet. Events will appear when the simulation starts.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
