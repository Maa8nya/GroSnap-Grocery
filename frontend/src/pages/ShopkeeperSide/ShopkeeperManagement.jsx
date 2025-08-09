import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  Box, Typography, Button, Card, CardContent, CardActions,
  TextField, Grid, Tabs, Tab, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, CircularProgress, Snackbar, Alert,
  List, ListItem, ListItemText, Divider, Chip, Avatar, Badge
} from '@mui/material';
import {
  Edit as EditIcon, Add as AddIcon, Delete as DeleteIcon,
  Inventory as InventoryIcon, Store as StoreIcon, Receipt as ReceiptIcon,
  Check as CheckIcon, Close as CloseIcon, Phone as PhoneIcon,
  LocalShipping as ShippingIcon, ShoppingCart as CartIcon,
  AttachMoney as MoneyIcon, Category as CategoryIcon,
  Numbers as NumbersIcon, Warehouse as WarehouseIcon
} from '@mui/icons-material';
import { ThemeProvider, alpha } from '@mui/material/styles';
import shopkeeperTheme from '../../themes/shopkeeperTheme';

const ShopkeeperManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      customer: 'John Doe', 
      items: ['Organic Apples (2kg)', 'Free Range Eggs (12pcs)'], 
      status: 'pending',
      date: '2023-05-15',
      total: 1197.75
    },
    { 
      id: 2, 
      customer: 'Jane Smith', 
      items: ['Whole Wheat Bread (2 loaves)'], 
      status: 'pending',
      date: '2023-05-15',
      total: 523.50
    },
    { 
      id: 3, 
      customer: 'Mike Johnson', 
      items: ['Organic Apples (5kg)', 'Free Range Eggs (6pcs)'], 
      status: 'accepted',
      date: '2023-05-14',
      total: 1869.75
    }
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    stock: '', 
    category: '' 
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('shopkeeperRegistered');
    if (!isAuthenticated) {
      navigate('/shopkeeper/register');
      return;
    }

    const timer = setTimeout(() => {
      setProducts([
        { id: 1, name: 'Organic Apples', price: 224.25, stock: 50, category: 'Fruits' },
        { id: 2, name: 'Whole Wheat Bread', price: 261.75, stock: 30, category: 'Bakery' },
        { id: 3, name: 'Free Range Eggs', price: 374.25, stock: 20, category: 'Dairy' },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({...product});
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    setProducts(products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));
    setOpenEditDialog(false);
    setEditingProduct(null);
    showSnackbar('Product updated successfully!', 'success');
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      showSnackbar('Please fill all fields', 'error');
      return;
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productToAdd = {
      ...newProduct,
      id: newId,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', price: '', stock: '', category: '' });
    setOpenAddDialog(false);
    showSnackbar('Product added successfully!', 'success');
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    showSnackbar('Product deleted successfully!', 'info');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
    showSnackbar('Order accepted successfully!', 'success');
  };

  const handleRejectOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
    showSnackbar('Order rejected successfully!', 'info');
  };

  const handleContactCustomer = (customerName) => {
    showSnackbar(`Contacting ${customerName}...`, 'info');
  };

  const handleShipOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'shipped' } : order
    ));
    showSnackbar('Order marked as shipped!', 'success');
  };

  if (loading) {
    return (
      <ThemeProvider theme={shopkeeperTheme}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: shopkeeperTheme.palette.background.default
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <CircularProgress color="primary" size={80} />
          </motion.div>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={shopkeeperTheme}>
      <Box sx={{ 
        p: { xs: 2, md: 4 }, 
        backgroundColor: shopkeeperTheme.palette.background.default,
        minHeight: '100vh'
      }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" sx={{ 
              color: shopkeeperTheme.palette.primary.main, 
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <StoreIcon sx={{ fontSize: 40 }} />
              </motion.div>
              Shopkeeper Dashboard
            </Typography>
          </motion.div>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            width: { xs: '100%', md: 'auto' },
            justifyContent: { xs: 'space-between', md: 'flex-end' }
          }}>
            <Badge 
              badgeContent={orders.filter(o => o.status === 'pending').length} 
              color="error"
              component={motion.div}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="outlined"
                startIcon={<ReceiptIcon />}
                onClick={() => setActiveTab(1)}
                sx={{
                  borderColor: shopkeeperTheme.palette.primary.main,
                  color: shopkeeperTheme.palette.primary.main
                }}
              >
                Pending Orders
              </Button>
            </Badge>
            <Button
              variant="contained"
              startIcon={<InventoryIcon />}
              onClick={() => setActiveTab(0)}
              sx={{
                backgroundColor: shopkeeperTheme.palette.primary.main,
                '&:hover': {
                  backgroundColor: shopkeeperTheme.palette.primary.dark
                }
              }}
            >
              Manage Products
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              component={motion.div}
              whileHover={{ y: -5 }}
              sx={{ 
                backgroundColor: alpha(shopkeeperTheme.palette.primary.main, 0.1),
                height: '100%'
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ 
                    bgcolor: shopkeeperTheme.palette.primary.main,
                    width: 56, 
                    height: 56 
                  }}>
                    <InventoryIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color="text.secondary">
                      Total Products
                    </Typography>
                    <Typography variant="h4">
                      {products.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              component={motion.div}
              whileHover={{ y: -5 }}
              sx={{ 
                backgroundColor: alpha(shopkeeperTheme.palette.success.main, 0.1),
                height: '100%'
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ 
                    bgcolor: shopkeeperTheme.palette.success.main,
                    width: 56, 
                    height: 56 
                  }}>
                    <ReceiptIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color="text.secondary">
                      Total Orders
                    </Typography>
                    <Typography variant="h4">
                      {orders.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              component={motion.div}
              whileHover={{ y: -5 }}
              sx={{ 
                backgroundColor: alpha(shopkeeperTheme.palette.warning.main, 0.1),
                height: '100%'
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ 
                    bgcolor: shopkeeperTheme.palette.warning.main,
                    width: 56, 
                    height: 56 
                  }}>
                    <CartIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color="text.secondary">
                      Pending Orders
                    </Typography>
                    <Typography variant="h4">
                      {orders.filter(o => o.status === 'pending').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              component={motion.div}
              whileHover={{ y: -5 }}
              sx={{ 
                backgroundColor: alpha(shopkeeperTheme.palette.info.main, 0.1),
                height: '100%'
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ 
                    bgcolor: shopkeeperTheme.palette.info.main,
                    width: 56, 
                    height: 56 
                  }}>
                    <ShippingIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color="text.secondary">
                      Shipped Orders
                    </Typography>
                    <Typography variant="h4">
                      {orders.filter(o => o.status === 'shipped').length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            borderRadius: 4,
            backgroundColor: shopkeeperTheme.palette.background.paper
          }}
        >
          {activeTab === 0 ? (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Product Inventory
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddDialog(true)}
                  sx={{
                    backgroundColor: shopkeeperTheme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: shopkeeperTheme.palette.primary.dark
                    }
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Product
                </Button>
              </Box>

              <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      backgroundColor: shopkeeperTheme.palette.primary.main,
                      '& th': { 
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1rem'
                      }
                    }}>
                      <TableCell>Product</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Stock</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow 
                        key={product.id}
                        component={motion.tr}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        hover
                        sx={{ '&:last-child td': { border: 0 } }}
                      >
                        <TableCell>
                          <Typography fontWeight={500}>
                            {product.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={product.category} 
                            size="small"
                            sx={{ 
                              backgroundColor: alpha(shopkeeperTheme.palette.primary.main, 0.1),
                              color: shopkeeperTheme.palette.primary.dark
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box display="flex" alignItems="center" justifyContent="flex-end">
                            <MoneyIcon color="success" sx={{ mr: 0.5, fontSize: 18 }} />
                            ₹{product.price.toFixed(2)}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box display="flex" alignItems="center" justifyContent="flex-end">
                            <WarehouseIcon color="info" sx={{ mr: 0.5, fontSize: 18 }} />
                            {product.stock}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <IconButton 
                              onClick={() => handleEditProduct(product)} 
                              sx={{ 
                                color: shopkeeperTheme.palette.primary.main,
                                backgroundColor: alpha(shopkeeperTheme.palette.primary.main, 0.1),
                                '&:hover': {
                                  backgroundColor: alpha(shopkeeperTheme.palette.primary.main, 0.2)
                                }
                              }}
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              onClick={() => handleDeleteProduct(product.id)} 
                              sx={{ 
                                color: shopkeeperTheme.palette.error.main,
                                backgroundColor: alpha(shopkeeperTheme.palette.error.main, 0.1),
                                '&:hover': {
                                  backgroundColor: alpha(shopkeeperTheme.palette.error.main, 0.2)
                                }
                              }}
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Order Management
              </Typography>
              
              {/* Pending Orders Section */}
              {orders.some(o => o.status === 'pending') && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Chip 
                      label={orders.filter(o => o.status === 'pending').length} 
                      color="error" 
                      size="small"
                    />
                    Pending Approval
                  </Typography>
                  <Grid container spacing={3}>
                    {orders.filter(o => o.status === 'pending').map((order) => (
                      <Grid item xs={12} key={order.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          <Card
                            component={motion.div}
                            whileHover={{ scale: 1.01 }}
                            sx={{ 
                              borderLeft: `4px solid ${shopkeeperTheme.palette.warning.main}`,
                              position: 'relative'
                            }}
                          >
                            <CardContent>
                              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                <Box>
                                  <Typography variant="h6" gutterBottom>
                                    Order #{order.id}
                                  </Typography>
                                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Customer: {order.customer} • {order.date}
                                  </Typography>
                                </Box>
                                <Typography variant="h6" color="primary">
                                  ₹{order.total.toFixed(2)}
                                </Typography>
                              </Box>
                              
                              <List dense sx={{ py: 0 }}>
                                {order.items.map((item, index) => (
                                  <ListItem 
                                    key={index} 
                                    sx={{ py: 0.5, px: 0 }}
                                    component={motion.li}
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <ListItemText 
                                      primary={item} 
                                      primaryTypographyProps={{
                                        component: motion.div,
                                        whileHover: { x: 5 }
                                      }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
                              <Button
                                variant="contained"
                                startIcon={<CheckIcon />}
                                onClick={() => handleAcceptOrder(order.id)}
                                sx={{
                                  backgroundColor: shopkeeperTheme.palette.success.main,
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: shopkeeperTheme.palette.success.dark
                                  }
                                }}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<CloseIcon />}
                                onClick={() => handleRejectOrder(order.id)}
                                sx={{
                                  borderColor: shopkeeperTheme.palette.error.main,
                                  color: shopkeeperTheme.palette.error.main,
                                  '&:hover': {
                                    backgroundColor: alpha(shopkeeperTheme.palette.error.main, 0.1)
                                  }
                                }}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Reject
                              </Button>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Accepted Orders Section */}
              {orders.some(o => o.status === 'accepted') && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Chip 
                      label={orders.filter(o => o.status === 'accepted').length} 
                      color="success" 
                      size="small"
                    />
                    Ready for Shipping
                  </Typography>
                  <Grid container spacing={3}>
                    {orders.filter(o => o.status === 'accepted').map((order) => (
                      <Grid item xs={12} md={6} key={order.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          <Card
                            component={motion.div}
                            whileHover={{ y: -5 }}
                            sx={{ 
                              height: '100%',
                              borderLeft: `4px solid ${shopkeeperTheme.palette.success.main}`
                            }}
                          >
                            <CardContent>
                              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                <Box>
                                  <Typography variant="h6" gutterBottom>
                                    Order #{order.id}
                                  </Typography>
                                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Customer: {order.customer} • {order.date}
                                  </Typography>
                                </Box>
                                <Typography variant="h6" color="primary">
                                  ₹{order.total.toFixed(2)}
                                </Typography>
                              </Box>
                              <List dense sx={{ py: 0 }}>
                                {order.items.map((item, index) => (
                                  <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                                    <ListItemText primary={item} />
                                  </ListItem>
                                ))}
                              </List>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
                              <Button
                                variant="outlined"
                                startIcon={<PhoneIcon />}
                                onClick={() => handleContactCustomer(order.customer)}
                                sx={{
                                  borderColor: shopkeeperTheme.palette.primary.main,
                                  color: shopkeeperTheme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(shopkeeperTheme.palette.primary.main, 0.1)
                                  }
                                }}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                              >
                                Contact
                              </Button>
                              <Button
                                variant="contained"
                                startIcon={<ShippingIcon />}
                                onClick={() => handleShipOrder(order.id)}
                                sx={{
                                  backgroundColor: shopkeeperTheme.palette.info.main,
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: shopkeeperTheme.palette.info.dark
                                  }
                                }}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Ship Order
                              </Button>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Shipped Orders Section */}
              {orders.some(o => o.status === 'shipped') && (
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 500,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Chip 
                      label={orders.filter(o => o.status === 'shipped').length} 
                      color="info" 
                      size="small"
                    />
                    Shipped Orders
                  </Typography>
                  <Grid container spacing={3}>
                    {orders.filter(o => o.status === 'shipped').map((order) => (
                      <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Card sx={{ 
                            height: '100%',
                            borderLeft: `4px solid ${shopkeeperTheme.palette.info.main}`
                          }}>
                            <CardContent>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" gutterBottom>
                                  Order #{order.id}
                                </Typography>
                                <Chip 
                                  label="SHIPPED" 
                                  color="info" 
                                  size="small"
                                  icon={<ShippingIcon fontSize="small" />}
                                />
                              </Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Customer: {order.customer}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {order.items.length} item(s)
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Total: ₹{order.total.toFixed(2)}
                              </Typography>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          )}
        </Paper>

        {/* Edit Product Dialog */}
        <Dialog 
          open={openEditDialog} 
          onClose={() => setOpenEditDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ 
            backgroundColor: shopkeeperTheme.palette.primary.main,
            color: 'white',
            fontWeight: 600
          }}>
            Edit Product
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Product Name"
                  value={editingProduct?.name || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InventoryIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  type="number"
                  value={editingProduct?.price || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <MoneyIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  value={editingProduct?.stock || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <WarehouseIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  value={editingProduct?.category || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <CategoryIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setOpenEditDialog(false)}
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit} 
              variant="contained"
              sx={{
                backgroundColor: shopkeeperTheme.palette.primary.main,
                '&:hover': {
                  backgroundColor: shopkeeperTheme.palette.primary.dark
                }
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Product Dialog */}
        <Dialog 
          open={openAddDialog} 
          onClose={() => setOpenAddDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ 
            backgroundColor: shopkeeperTheme.palette.primary.main,
            color: 'white',
            fontWeight: 600
          }}>
            Add New Product
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InventoryIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <MoneyIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <WarehouseIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <CategoryIcon color="primary" sx={{ mr: 1 }} />
                    )
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setOpenAddDialog(false)}
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddProduct} 
              variant="contained"
              sx={{
                backgroundColor: shopkeeperTheme.palette.primary.main,
                '&:hover': {
                  backgroundColor: shopkeeperTheme.palette.primary.dark
                }
              }}
            >
              Add Product
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar with animation */}
        <AnimatePresence>
          {snackbar.open && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Alert 
                  onClose={handleCloseSnackbar} 
                  severity={snackbar.severity}
                  sx={{ width: '100%' }}
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};

export default ShopkeeperManagement;