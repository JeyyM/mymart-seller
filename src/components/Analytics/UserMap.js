import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function UserMap({ data, center, colors, showuser }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapLoaded && typeof window !== 'undefined') {
      const map = L.map('map-container').setView([center.lat, center.lng], 10);

      const circleMarkerOptions = {
        radius: 8, 
        fillColor: 'blue', 
        color: 'white', 
        weight: 3,
        opacity: 0.7,
        fillOpacity: 0.8,
      };

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([center.lat, center.lng], {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/128/727/727590.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
      }).addTo(map);

      data.forEach((item, index) => {
        const { lat, lng } = item.coords;
        const circleMarker = L.circleMarker([lat, lng], {
          ...circleMarkerOptions,
          fillColor: colors[index],
        }).addTo(map);

        circleMarker.on('click', () => {
          showuser(item)
        });
      });

      setMapLoaded(true);
    }
  }, [data, center, colors, mapLoaded]);

  return <div id="map-container" style={{ width: '100%', height: '100%' }} />;
}

export default UserMap;
