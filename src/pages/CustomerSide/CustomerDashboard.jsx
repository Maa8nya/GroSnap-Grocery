import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, TextField, Card, CardContent, Avatar, Chip, Badge, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import customerTheme from '../../themes/customerTheme';
import { ShoppingCart, Search, Store, ListAlt, Receipt, AccountCircle } from '@mui/icons-material';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('stores');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const nearbyStores = [
    {
      id: 1,
      name: "Fresh Mart",
      distance: "0.5 km",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      categories: ["Groceries", "Vegetables", "Dairy"]
    },
    {
      id: 2,
      name: "Daily Needs",
      distance: "1.2 km",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      categories: ["Groceries", "Snacks", "Beverages"]
    },
    {
      id: 3,
      name: "Green Veggies",
      distance: "0.8 km",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      categories: ["Vegetables", "Fruits", "Organic"]
    }
  ];

  const recentOrders = [
    {
      id: 1,
      store: "Fresh Mart",
      date: "2023-06-15",
      status: "Delivered",
      amount: "₹1,245",
      items: 12
    },
    {
      id: 2,
      store: "Daily Needs",
      date: "2023-06-10",
      status: "Delivered",
      amount: "₹890",
      items: 8
    }
  ];

  return (
    <ThemeProvider theme={customerTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Header */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', mx: 'auto' }}>
            <Typography variant="h6" fontWeight="bold">GroSnap</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit">
                <ShoppingCart />
              </IconButton>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            <Button
              onClick={() => setActiveTab('stores')}
              sx={{
                color: activeTab === 'stores' ? 'primary.main' : 'text.secondary',
                borderBottom: activeTab === 'stores' ? '2px solid' : 'none',
                borderColor: 'primary.main',
                borderRadius: 0
              }}
            >
              Nearby Stores
            </Button>
            <Button
              onClick={() => setActiveTab('orders')}
              sx={{
                color: activeTab === 'orders' ? 'primary.main' : 'text.secondary',
                borderBottom: activeTab === 'orders' ? '2px solid' : 'none',
                borderColor: 'primary.main',
                borderRadius: 0
              }}
            >
              My Orders
            </Button>
            <Button
              onClick={() => setActiveTab('lists')}
              sx={{
                color: activeTab === 'lists' ? 'primary.main' : 'text.secondary',
                borderBottom: activeTab === 'lists' ? '2px solid' : 'none',
                borderColor: 'primary.main',
                borderRadius: 0
              }}
            >
              My Lists
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
          {activeTab === 'stores' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Nearby Stores</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                {nearbyStores.map((store) => (
                  <motion.div
                    key={store.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <Box sx={{ height: '140px', position: 'relative' }}>
                        <img
                          src={store.image}
                          alt={store.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                        />
                        <Box sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', px: 1, borderRadius: '4px' }}>
                          {store.rating} ★
                        </Box>
                      </Box>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{store.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{store.distance} away</Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {store.categories.map((category, index) => (
                            <Chip key={index} label={category} size="small" />
                          ))}
                        </Box>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mt: 2 }}
                          startIcon={<Store />}
                          onClick={() => {/* Navigate to store */}}
                        >
                          Visit Store
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Recent Orders</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{order.store}</Typography>
                          <Typography variant="body2" color="text.secondary">{order.date} • {order.items} items</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{order.amount}</Typography>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>My Lists</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                <ListAlt sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>You haven't created any lists yet</Typography>
                <Button variant="contained" startIcon={<ListAlt />}>
                  Create New List
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }} 
                  onClick={() => {/* Open handwritten list upload modal */}}
                >
                  Upload Handwritten List
                </Button>
              </Box>
            </motion.div>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CustomerDashboard;