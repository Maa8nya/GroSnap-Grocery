import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './fixleafleticons';

function NearbyStores() {
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const kmToMinutes = (km) => Math.round((km / 5) * 60);

  const fetchStores = async (lat, lon) => {
    setLoading(true);
    setError('');
    const radius = 8000;

    const query = `
      [out:json][timeout:25];
      (
        node["shop"~"convenience|grocery|supermarket"](around:${radius},${lat},${lon});
        way["shop"~"convenience|grocery|supermarket"](around:${radius},${lat},${lon});
      );
      out center;
    `;

    try {
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      const data = await response.json();

      const parsedStores = data.elements
        .map(el => {
          const latStore = el.lat ?? el.center?.lat;
          const lonStore = el.lon ?? el.center?.lon;
          if (!latStore || !lonStore) return null;

          return {
            id: el.id,
            name: el.tags?.name || 'Unnamed Store',
            type: el.tags?.shop || 'store',
            lat: latStore,
            lon: lonStore,
            distance: getDistance(lat, lon, latStore, lonStore)
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

      setStores(parsedStores);
    } catch (err) {
      setError('Failed to fetch stores. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const locateUser = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchStores(latitude, longitude);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Nearby Stores</h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <button
          onClick={locateUser}
          disabled={loading}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s'
          }}
        >
          {loading ? 'Searching...' : 'Find Nearby Stores'}
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#d32f2f',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {location && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '20px'
        }}>
          {/* Map Container */}
          <div style={{
            height: '400px',
            width: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <MapContainer
              center={[location.lat, location.lon]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[location.lat, location.lon]}>
                <Popup>Your Location</Popup>
              </Marker>
              {stores.map(store => (
                <Marker key={store.id} position={[store.lat, store.lon]}>
                  <Popup>
                    <div>
                      <h4 style={{ margin: '5px 0' }}>{store.name}</h4>
                      <p style={{ margin: '5px 0' }}>{store.type}</p>
                      <p style={{ margin: '5px 0' }}>
                        {store.distance.toFixed(2)} km away
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Horizontal Scrollable Store Cards */}
          <div style={{
            padding: '10px 0',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            borderTop: '1px solid #ddd'
          }}>
            <h2 style={{
              marginBottom: '10px',
              paddingLeft: '10px'
            }}>
              📍 Nearby Stores ({stores.length})
            </h2>

            {stores.length > 0 ? (
              <div style={{
                display: 'flex',
                gap: '15px',
                padding: '10px',
                minHeight: '150px'
              }}>
                {stores.map(store => (
                  <div key={store.id} style={{
                    minWidth: '220px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '15px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    display: 'inline-block',
                    whiteSpace: 'normal'
                  }}>
                    <h3 style={{ margin: '0 0 5px', color: '#2E7D32' }}>{store.name}</h3>
                    <p style={{ margin: '5px 0', color: '#555' }}>{store.type}</p>
                    <p style={{ margin: '5px 0' }}>🚶‍♂️ ~{kmToMinutes(store.distance)} min</p>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>{store.distance.toFixed(2)} km</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                backgroundColor: '#E3F2FD',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0 }}>No stores found in your area.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!location && !loading && (
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '30px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '30px'
        }}>
          <p style={{ fontSize: '18px' }}>
            Click "Find Nearby Stores" to discover shops near your location
          </p>
          <p style={{ color: '#666' }}>
            We'll search within an 8 km radius for grocery stores and supermarkets
          </p>
        </div>
      )}
    </div>
  );
}

export default NearbyStores;
