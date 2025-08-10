import React from "react";
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Divider,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { ShoppingCart, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  // In a real app, you would get cartItems from context or props
  const cartItems = [
    { name: "Tomatoes", quantity: 2 },
    { name: "Organic Honey", quantity: 1 }
  ];

  const theme = {
    primary: "#2E7D32", // Green
    secondary: "#FF5722", // Orange
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: theme.primary }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            My Cart
          </Typography>
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {cartItems.length === 0 ? (
          <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {cartItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <ListItem>
                    <ListItemText 
                      primary={item.name} 
                      secondary={`Quantity: ${item.quantity}`} 
                    />
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: theme.secondary,
                "&:hover": { backgroundColor: "#E64A19" },
                py: 1.5,
                fontSize: "1.1rem"
              }}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Cart;