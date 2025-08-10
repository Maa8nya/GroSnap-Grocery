import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './fixleafleticons';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function NearbyStores() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [firestoreStores, setFirestoreStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFirestore, setLoadingFirestore] = useState(true);
  const [error, setError] = useState('');
  const [firestoreError, setFirestoreError] = useState('');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

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

  const fetchRegisteredStores = async () => {
    setLoadingFirestore(true);
    setFirestoreError(null);
    try {
      const snap = await getDocs(collection(db, 'shopkeepers'));
      const storesFromDb = snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        // Add mock contact info if not present
        contact: doc.data().contact || {
          phone: '+1 (555) 123-4567',
          email: `contact@${doc.data().shopName.toLowerCase().replace(/\s+/g, '')}.com`
        }
      }));
      setFirestoreStores(storesFromDb);
    } catch (err) {
      console.error('Error fetching Firestore stores:', err);
      setFirestoreError('Failed to load registered stores');
    } finally {
      setLoadingFirestore(false);
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
        fetchRegisteredStores();
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  const handleShopClick = (storeId) => {
    navigate(`/grocery/${storeId}`);
  };

  const handleContactClick = (store) => {
    setSelectedStore(store);
    setContactDialogOpen(true);
  };

  const handleCloseContactDialog = () => {
    setContactDialogOpen(false);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
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

      {(error || firestoreError) && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#d32f2f',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error || firestoreError}
        </div>
      )}

      {location && (
        <>
          {/* Map and Registered Stores Side by Side */}
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Map Container - 70% width */}
            <div style={{
              flex: '7',
              height: '400px',
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
                        <button
                          onClick={() => handleContactClick(store)}
                          style={{
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '5px'
                          }}
                        >
                          Contact
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                {firestoreStores.map(store => (
                  store.latitude && store.longitude && (
                    <Marker key={store.id} position={[store.latitude, store.longitude]}>
                      <Popup>
                        <div>
                          <h4 style={{ margin: '5px 0' }}>{store.shopName}</h4>
                          <p style={{ margin: '5px 0' }}>{store.shopAddress}</p>
                          <button
                            onClick={() => handleShopClick(store.id)}
                            style={{
                              backgroundColor: '#4CAF50',
                              color: 'white',
                              border: 'none',
                              padding: '5px 10px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              marginTop: '5px'
                            }}
                          >
                            Shop Here
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>

            {/* Registered Stores List - 30% width */}
            <div style={{
              flex: '3',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              overflowY: 'auto',
              maxHeight: '400px'
            }}>
              <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#2E7D32' }}>
                🏪 Registered Stores ({firestoreStores.length})
              </h2>
              
              {loadingFirestore && <p>Loading registered stores...</p>}
              {!loadingFirestore && firestoreStores.length === 0 && (
                <p style={{ color: '#666' }}>No registered stores found in your area.</p>
              )}
              
              {!loadingFirestore && firestoreStores.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {firestoreStores.map(store => (
                    <div key={store.id} style={{
                      backgroundColor: '#f5f5f5',
                      borderRadius: '6px',
                      padding: '15px',
                      borderLeft: '4px solid #4CAF50'
                    }}>
                      <h3 style={{ margin: '0 0 5px', color: '#2E7D32' }}>{store.shopName}</h3>
                      <p style={{ margin: '5px 0', color: '#555' }}>{store.shopAddress}</p>
                      {store.latitude && store.longitude && (
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                          📍 {getDistance(location.lat, location.lon, store.latitude, store.longitude).toFixed(2)} km away
                        </p>
                      )}
                      <button
                        onClick={() => handleShopClick(store.id)}
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginTop: '10px',
                          width: '100%'
                        }}
                      >
                        Shop Here
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Nearby Stores List */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#2E7D32' }}>
              📍 Nearby Stores ({stores.length})
            </h2>
            
            {stores.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '15px'
              }}>
                {stores.map(store => (
                  <div key={store.id} style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '6px',
                    padding: '15px',
                    borderLeft: '4px solid #2196F3'
                  }}>
                    <h3 style={{ margin: '0 0 5px', color: '#1565C0' }}>{store.name}</h3>
                    <p style={{ margin: '5px 0', color: '#555' }}>{store.type}</p>
                    <p style={{ margin: '5px 0' }}>
                      🚶‍♂️ ~{kmToMinutes(store.distance)} min ({store.distance.toFixed(2)} km)
                    </p>
                    <button
                      onClick={() => handleContactClick(store)}
                      style={{
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px',
                        width: '100%'
                      }}
                    >
                      Contact
                    </button>
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
        </>
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

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onClose={handleCloseContactDialog}>
        <DialogTitle>Contact {selectedStore?.name}</DialogTitle>
        <DialogContent>
          {selectedStore && (
            <div style={{ padding: '20px' }}>
              <h3 style={{ marginTop: 0 }}>{selectedStore.name}</h3>
              <p>Address: {selectedStore.address || 'Not available'}</p>
              
              {/* For registered stores */}
              {selectedStore.contact && (
                <>
                  <p>Phone: {selectedStore.contact.phone}</p>
                  <p>Email: {selectedStore.contact.email}</p>
                </>
              )}
              
              {/* For nearby stores (mock data) */}
              {!selectedStore.contact && (
                <>
                  <p>Phone: +1 (555) 987-6543</p>
                  <p>Email: contact@{selectedStore.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                </>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContactDialog} color="primary">
            Close
          </Button>
          <Button 
            onClick={() => {
              window.location.href = `mailto:${selectedStore?.contact?.email || `contact@${selectedStore?.name.toLowerCase().replace(/\s+/g, '')}.com`}`;
            }} 
            color="primary"
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NearbyStores;