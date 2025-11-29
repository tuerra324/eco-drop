"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function ScanMap({ scans }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet only on client side
    import("leaflet").then((L) => {
      // Check again in case component unmounted during import
      if (!mapRef.current || mapInstanceRef.current) return;

      // Fix for default marker icon in Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Initialize map centered on Baku
      const map = L.map(mapRef.current).setView([40.4093, 49.8671], 12);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Material icon colors
      const materialColors = {
        Plastic: "#3B82F6", // blue
        Paper: "#F59E0B", // amber
        Metal: "#6B7280", // gray
        Glass: "#10B981", // green
      };

      // Add markers for each scan
      scans.forEach((scan) => {
        if (scan.lat && scan.lng) {
          const color = materialColors[scan.materialType] || "#10B981";
          
          // Create custom icon with material color
          const customIcon = L.divIcon({
            html: `
              <div style="
                background: ${color};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  color: white;
                  font-size: 16px;
                  transform: rotate(45deg);
                  font-weight: bold;
                ">
                  ${scan.confidence}%
                </div>
              </div>
            `,
            className: "custom-marker",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          const marker = L.marker([scan.lat, scan.lng], { icon: customIcon }).addTo(map);

          // Add popup
          marker.bindPopup(`
            <div style="min-width: 180px; padding: 8px;">
              <div style="font-weight: bold; font-size: 16px; color: #111827; margin-bottom: 6px;">
                ${scan.material}
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #6B7280;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span>📍</span>
                  <span>${scan.location}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span>🕐</span>
                  <span>${scan.time} - ${scan.date}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span>✓</span>
                  <span style="color: ${color}; font-weight: 600;">${scan.confidence}% confidence</span>
                </div>
              </div>
            </div>
          `);
        }
      });

      mapInstanceRef.current = map;
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [scans]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100"
      style={{ zIndex: 1 }}
    />
  );
}
