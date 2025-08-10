import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box, Typography, Button, TextField, Card, CardContent,
  Chip, IconButton, Dialog, DialogContent, DialogTitle, DialogActions
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import customerTheme from '../../themes/customerTheme';
import { ShoppingCart, Search, Store, ListAlt, AccountCircle } from '@mui/icons-material';
import NearbyStores from './NearbyStores';
import OCRUpload from './ocr_upload';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('stores');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMapView, setShowMapView] = useState(false);
  const [showOCRUpload, setShowOCRUpload] = useState(false);
  const [showNotepadDialog, setShowNotepadDialog] = useState(false);
  const [notepadText, setNotepadText] = useState('');
  const [lists, setLists] = useState([]);
  const [registeredStores, setRegisteredStores] = useState([]);
  const [loadingStores, setLoadingStores] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const sampleOrders = [
    { id: 1, store: 'Grocery Mart', date: '2025-08-01', items: 5, amount: '$24.99', status: 'Delivered' },
    { id: 2, store: 'Fresh Foods', date: '2025-08-02', items: 3, amount: '$12.50', status: 'In Transit' },
    { id: 3, store: 'Veggie Ville', date: '2025-08-05', items: 7, amount: '$40.00', status: 'Processing' },
  ];

  useEffect(() => {
    const fetchRegisteredStores = async () => {
      setLoadingStores(true);
      setFetchError(null);
      try {
        // <-- Changed collection path here -->
        const snap = await getDocs(collection(db, 'shopkeepers'));
        const stores = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRegisteredStores(stores);
      } catch (err) {
        console.error('Error fetching stores:', err);
        setFetchError('Failed to load registered stores');
      } finally {
        setLoadingStores(false);
      }
    };
    fetchRegisteredStores();
  }, []);

  const handleOpenNotepad = () => {
    setNotepadText('');
    setShowNotepadDialog(true);
  };

  const handleSaveNotepad = () => {
    const items = notepadText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const newList = {
      id: Date.now(),
      name: `Grocery List ${lists.length + 1}`,
      items,
      createdAt: new Date().toISOString()
    };

    setLists(prev => [...prev, newList]);
    setShowNotepadDialog(false);
    setNotepadText('');
  };

  const handleOCRSuccess = (text) => {
    const items = text.split('\n').map(l => l.trim()).filter(l => l);
    const newList = {
      id: Date.now(),
      name: `OCR List ${lists.length + 1}`,
      items,
      createdAt: new Date().toISOString()
    };
    setLists(prev => [...prev, newList]);
    setShowOCRUpload(false);
  };

  return (
    <ThemeProvider theme={customerTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Header */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
          <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">GroSnap</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton color="inherit"><ShoppingCart /></IconButton>
              <IconButton color="inherit"><AccountCircle /></IconButton>
            </Box>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TextField
              fullWidth
              placeholder="Search for stores or products..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
                sx: { borderRadius: '12px', bgcolor: 'background.paper' }
              }}
            />
          </motion.div>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '1200px', mx: 'auto' }}>
          <Box sx={{ display: 'flex', px: 2 }}>
            {['stores', 'orders', 'lists'].map(tab => (
              <Button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowMapView(false); }}
                sx={{
                  color: activeTab === tab ? 'primary.main' : 'text.secondary',
                  borderBottom: activeTab === tab ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                  borderRadius: 0
                }}
              >
                {tab === 'stores' ? 'Nearby Stores' : tab === 'orders' ? 'My Orders' : 'My Lists'}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
          {activeTab === 'stores' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Nearby Stores</Typography>
                <Button
                  variant="outlined"
                  onClick={() => setShowMapView(prev => !prev)}
                  startIcon={<Store />}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    '&:hover': { borderColor: 'primary.dark' }
                  }}
                >
                  {showMapView ? 'Show List View' : 'Show Map View'}
                </Button>
              </Box>

              {showMapView ? (
                <Box sx={{ display: 'flex', gap: 2, mb: 3, maxHeight: '500px' }}>
                  <Box sx={{ width: 250, height: 500, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                    <NearbyStores />
                  </Box>
                  <Box sx={{ flexGrow: 1, overflowY: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      Registered Stores
                    </Typography>
                    {loadingStores && <Typography>Loading stores...</Typography>}
                    {fetchError && <Typography color="error">{fetchError}</Typography>}
                    {!loadingStores && !fetchError && (
                      registeredStores.length > 0 ? registeredStores
                        // filter search results if searchQuery is not empty (optional)
                        .filter(store => store.shopName.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(store => (
                          <Box key={store.id} sx={{ mb: 2 }}>
                            <Typography variant="body1" fontWeight="medium">{store.shopName}</Typography>
                            {store.shopAddress && <Typography variant="body2" color="text.secondary">{store.shopAddress}</Typography>}
                          </Box>
                        )) : (
                        <Typography variant="body2" color="text.secondary">No registered stores found.</Typography>
                      )
                    )}
                  </Box>
                </Box>
              ) : (
                <NearbyStores />
              )}
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Recent Orders</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {sampleOrders.map(order => (
                  <motion.div key={order.id} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Card>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">{order.store}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.date} • {order.items} items
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Typography variant="h6" fontWeight="bold">{order.amount}</Typography>
                          <Chip
                            label={order.status}
                            size="small"
                            color={order.status === 'Delivered' ? 'success' : 'primary'}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}

          {activeTab === 'lists' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>My Lists</Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleOpenNotepad}
                  startIcon={<ListAlt />}
                  sx={{ borderRadius: 2 }}
                >
                  Create New List
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowOCRUpload(true)}
                  startIcon={<ListAlt />}
                  sx={{ borderRadius: 2 }}
                >
                  Upload via OCR
                </Button>
              </Box>

              {lists.length === 0 && <Typography>No lists created yet.</Typography>}

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {lists.map(list => (
                  <Card key={list.id} sx={{ width: 250 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{list.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Created: {new Date(list.createdAt).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ maxHeight: 100, overflowY: 'auto' }}>
                        {list.items.map((item, i) => (
                          <Typography key={i} variant="body2">• {item}</Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Notepad Dialog */}
              <Dialog open={showNotepadDialog} onClose={() => setShowNotepadDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Grocery List</DialogTitle>
                <DialogContent>
                  <TextField
                    multiline
                    fullWidth
                    minRows={8}
                    placeholder="Enter one item per line"
                    value={notepadText}
                    onChange={(e) => setNotepadText(e.target.value)}
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowNotepadDialog(false)}>Cancel</Button>
                  <Button variant="contained" onClick={handleSaveNotepad} disabled={notepadText.trim().length === 0}>Save</Button>
                </DialogActions>
              </Dialog>

              {/* OCR Upload Dialog */}
              {showOCRUpload && (
                <OCRUpload
                  open={showOCRUpload}
                  onClose={() => setShowOCRUpload(false)}
                  onSuccess={handleOCRSuccess}
                />
              )}
            </motion.div>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CustomerDashboard;
