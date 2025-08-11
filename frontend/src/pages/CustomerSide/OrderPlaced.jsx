import React from "react";
import { 
  Box, 
  Typography, 
  Button,
  Container,
  Paper,
  Divider,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { 
  CheckCircle, 
  ShoppingCart, 
  Home, 
  ArrowBack 
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; 

export default function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header with Logo and Navigation */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {/* Logo that links to home */}
          <Box 
            component="img"
            src="/logo.png" 
            alt="Company Logo" 
            sx={{ 
              height: 40, 
              mr: 2,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')} // Link to landing page
          />
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Back Button */}
          <IconButton 
            color="inherit" 
            onClick={() => navigate(-1)} // Go back to previous page
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          
          {/* Home Button */}
          <Button 
            variant="outlined" 
            startIcon={<Home />}
            onClick={() => navigate('/')} // Link to landing page
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Order Confirmation Content */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <CheckCircle 
            color="success" 
            sx={{ fontSize: 80, mb: 2 }} 
          />
          
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Order Placed Successfully!
          </Typography>
          
          <Typography variant="h6" color="text.secondary" paragraph>
            Thank you for shopping with us. Your order has been confirmed.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ 
            backgroundColor: '#f5f5f5', 
            p: 3, 
            borderRadius: 2,
            textAlign: 'left',
            mb: 3
          }}>
            <Typography variant="body1" paragraph>
              <strong>What's next?</strong>
            </Typography>
            <Typography variant="body2" paragraph>
              • You'll receive an order confirmation message from Shopkeeper shortly!
            </Typography>
            <Typography variant="body2" paragraph>
              • Your items will be prepared and shipped whenever you are ready.
            </Typography>
    
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={() => navigate('/Customer/Cart')}
              sx={{ px: 4 }}
            >
              View Order Details
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Home />}
              onClick={() => navigate('/Customer/dashboard')}
              sx={{ px: 4 }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}