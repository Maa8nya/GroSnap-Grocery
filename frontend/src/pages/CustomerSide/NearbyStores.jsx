import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './fixleafleticons'; // Fixes Leaflet marker icon path issue
//feteched nearby stores (necessaryfixleafleticons)
function NearbyStores() {
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Haversine formula to calculate distance in km
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Return as number in km (not fixed string)
  };

  // Convert km to walking time in minutes (5 km/h walking speed)
  const kmToMinutes = (km) => Math.round((km / 5) * 60);

  const fetchStores = async (lat, lon) => {
    setLoading(true);
    setError('');
    const radius = 8000;

    const query = `
      [out:json][timeout:25];
      (
        node["shop"~"convenience|grocery|supermarket|general|store|bhandaar|departmental|bhandar|provision|stores"](around:${radius},${lat},${lon});
        way["shop"~"convenience|grocery|supermarket|general|store|bhandaar|angadi|departmental|bhandar|provision|stores"](around:${radius},${lat},${lon});
      );
      out center;
    `;
    const body = {
    query,
    user_lat: lat,
    user_lon: lon,
  };

    try {
      const res = await fetch('http://localhost:5001/api/overpass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      const parsedStores = data.elements
        .map((el) => {
          const latStore = el.lat ?? el.center?.lat ?? null;
          const lonStore = el.lon ?? el.center?.lon ?? null;
          if (latStore === null || lonStore === null) return null;

          return {
            id: el.id,
            name: el.tags?.name || 'Unnamed Store',
            type: el.tags?.shop || 'unknown',
            lat: latStore,
            lon: lonStore,
            distance: getDistance(lat, lon, latStore, lonStore),
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance); // Sort by nearest first

      console.log('✅ Parsed stores:', parsedStores);
      setStores(parsedStores);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const locateUser = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('📍 User location:', latitude, longitude);
        setLocation({ lat: latitude, lon: longitude });
        fetchStores(latitude, longitude);
      },
      (err) => {
        setLoading(false);
        setError(`Geolocation error: ${err.message}`);
      }
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={locateUser} disabled={loading}>
        {loading ? 'Loading...' : 'Find Nearby Stores'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {location && (
        <>
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={15}
            style={{ height: '400px', marginTop: '1rem' }}
            key={`${location.lat}-${location.lon}`}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lon]}>
              <Popup>Your Location</Popup>
            </Marker>

            {stores.map((store) => (
              <Marker key={store.id} position={[store.lat, store.lon]}>
                <Popup>
                  <b>{store.name}</b>
                  <br />
                  {store.type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            marginTop: '1rem',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h4>📍 Nearby Stores ({stores.length})</h4>
            {stores.length === 0 && <p>No stores found nearby.</p>}
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {stores.map((store) => (
                <li key={store.id} style={{ marginBottom: '0.5rem' }}>
                  <b>{store.name}</b> ({store.type}) – {store.distance.toFixed(2)} km away (~{kmToMinutes(store.distance)} min walk)
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {!location && !loading && <p>Click "Find Nearby Stores" to start</p>}
    </div>
  );
}

export default NearbyStores;
