import { CityMap } from "./CityMap";
import type { Restaurant } from "@/lib/types";

async function getRestaurants(): Promise<Restaurant[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  try {
    const response = await fetch(`${apiUrl}/api/v1/restaurants`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Restaurant request failed: ${response.status}`);
    }

    return response.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const restaurants = await getRestaurants();

  return (
    <main>
      <nav>
        <a className="brand" href="#">
          <span className="brandMark" aria-hidden="true" />
          PulseGrid
        </a>
        <span className="status">
          <span className="statusDot" aria-hidden="true" />
          Development environment
        </span>
      </nav>

      <section className="hero">
        <p className="eyebrow">Marketplace operations intelligence</p>
        <h1>See a city&apos;s demand before it becomes a problem.</h1>
        <p className="summary">
          PulseGrid turns live marketplace events into dispatch decisions,
          demand signals, and operational insight.
        </p>

        <div className="metrics" aria-label="Current marketplace summary">
          <article>
            <strong>{restaurants.length}</strong>
            <span>Restaurants connected</span>
          </article>
          <article>
            <strong>0</strong>
            <span>Active orders</span>
          </article>
          <article>
            <strong>—</strong>
            <span>Median delivery time</span>
          </article>
        </div>
      </section>

      <section className="workspace">
        <CityMap restaurants={restaurants} />

        <aside>
          <div className="panelHeading">
            <div>
              <p className="eyebrow">API connection</p>
              <h2>Restaurants</h2>
            </div>
            <span className={restaurants.length ? "badge online" : "badge"}>
              {restaurants.length ? "Connected" : "API offline"}
            </span>
          </div>

          <div className="restaurantList">
            {restaurants.length ? (
              restaurants.map((restaurant) => (
                <article className="restaurant" key={restaurant.id}>
                  <div className="restaurantIcon">
                    {restaurant.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{restaurant.name}</strong>
                    <span>
                      {restaurant.cuisine} · {restaurant.neighborhood}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <p className="emptyState">
                Start the API to load the first marketplace records.
              </p>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
