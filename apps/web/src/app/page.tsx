import { CityMap } from "./CityMap";
import type { Order, Restaurant } from "@/lib/types";

const orderTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
});

async function getApiData<T>(path: string): Promise<T | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  try {
    const response = await fetch(`${apiUrl}${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const [restaurantData, orderData] = await Promise.all([
    getApiData<Restaurant[]>("/api/v1/restaurants"),
    getApiData<Order[]>("/api/v1/orders"),
  ]);
  const restaurants = restaurantData ?? [];
  const orders = orderData ?? [];
  const apiAvailable = restaurantData !== null && orderData !== null;
  const activeOrders = orders.filter((order) => order.status !== "delivered");

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
            <a href="#orders">Orders</a>
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
            <strong>{activeOrders.length}</strong>
            <small>{orderData === null ? "Waiting for API" : "Demo order records"}</small>
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

        <section className="panel activityPanel" id="orders">
          <div className="panelHeader">
            <div>
              <h2>Recent orders</h2>
              <p>Most recent demo orders from the database</p>
            </div>
          </div>
          <div className="tableWrapper">
            <table>
              <thead>
                <tr><th>Time</th><th>Order</th><th>Restaurant</th><th>Status</th></tr>
              </thead>
              <tbody>
                {orders.length ? orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <time dateTime={order.created_at}>
                        {orderTimeFormatter.format(new Date(order.created_at))}
                      </time>
                    </td>
                    <td>{order.id}</td>
                    <td>{order.restaurant_name}</td>
                    <td><span className={`orderStatus ${order.status}`}>{order.status}</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="tableEmpty">
                      {orderData === null ? "Start the API to load orders." : "No orders yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
