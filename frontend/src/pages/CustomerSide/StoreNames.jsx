import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  TextField,
  IconButton,
  Button
} from '@mui/material';
import { Search, Store, LocationOn, Phone, Schedule, ArrowBack } from '@mui/icons-material';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from "firebase/firestore";

const StoreNames = ({ onBackToList }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const storesRef = collection(db, 'stores');
        
        // Basic query (you can add more filters/ordering as needed)
        let q = query(storesRef, orderBy('name'));
        
        // If you want to add real-time updates, use onSnapshot instead
        const querySnapshot = await getDocs(q);
        
        const storesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setStores(storesData);
      } catch (err) {
        setError(err.message || 'Failed to fetch stores');
        console.error('Firestore error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {onBackToList && (
          <IconButton onClick={onBackToList} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Store Directory
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search stores by name, address or city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {filteredStores.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>No stores found</Typography>
      ) : (
        <List sx={{ bgcolor: 'background.paper' }}>
          {filteredStores.map((store, index) => (
            <React.Fragment key={store.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      {store.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {store.address}, {store.city}, {store.state} {store.zipCode}
                        </Typography>
                      </Box>
                      {store.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {store.phone}
                          </Typography>
                        </Box>
                      )}
                      {store.hours && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Schedule fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {store.hours}
                          </Typography>
                        </Box>
                      )}
                    </>
                  }
                />
              </ListItem>
              {index < filteredStores.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default StoreNames;