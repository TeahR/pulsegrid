"use client";

import { useEffect, useRef } from "react";
import {
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
} from "maplibre-gl";

import type { Restaurant } from "@/lib/types";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";
const NEW_YORK: [number, number] = [-74.006, 40.7128];

export function CityMap({ restaurants }: { restaurants: Restaurant[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      style: MAP_STYLE,
      center: NEW_YORK,
      zoom: 11,
    });

    map.addControl(new NavigationControl(), "top-right");

    if (restaurants.length) {
      const bounds = new LngLatBounds();

      for (const restaurant of restaurants) {
        const coordinates: [number, number] = [
          restaurant.longitude,
          restaurant.latitude,
        ];

        new Marker({ color: "#176b52" })
          .setLngLat(coordinates)
          .setPopup(
            new Popup({ offset: 24 }).setText(
              `${restaurant.name} · ${restaurant.cuisine} · ${restaurant.neighborhood}`,
            ),
          )
          .addTo(map);

        bounds.extend(coordinates);
      }

      map.fitBounds(bounds, { padding: 70, maxZoom: 13 });
    }

    return () => map.remove();
  }, [restaurants]);

  return (
    <div className="mapShell">
      <div ref={containerRef} className="cityMap" aria-label="Restaurant map" />
    </div>
  );
}
