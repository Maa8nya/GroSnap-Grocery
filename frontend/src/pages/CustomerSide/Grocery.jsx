import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, AppBar, Toolbar } from "@mui/material";
import { ShoppingBasket, LocalGroceryStore, Kitchen, BreakfastDining, ShoppingCart, Person } from "@mui/icons-material";

const GroceryCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Fresh Vegetables");

  // Customer theme colors
  const theme = {
    primary: "#2E7D32", // Green
    secondary: "#FF5722", // Orange
    background: "#F5F5F5",
    text: "#333333",
  };

  // Sample data structure
  const categories = [
    {
      name: "Fresh Vegetables",
      icon: <LocalGroceryStore fontSize="large" />,
      products: ["Tomatoes", "Potatoes", "Onions", "Carrots", "Cucumbers"]
    },
    {
      name: "Fresh Fruits",
      icon: <LocalGroceryStore fontSize="large" />,
      products: ["Apples", "Bananas", "Oranges", "Grapes", "Mangoes"]
    },
    {
      name: "Dairy, Bread & Eggs",
      icon: <Kitchen fontSize="large" />,
      products: ["Milk", "Eggs", "Cheese", "Butter", "Bread"]
    },
    {
      name: "Cereals & Breakfast",
      icon: <BreakfastDining fontSize="large" />,
      products: ["Corn Flakes", "Oats", "Muesli", "Granola", "Wheat Flakes"]
    },
    {
      name: "Atta, Rice & Dal",
      icon: <Kitchen fontSize="large" />,
      products: ["Wheat Flour", "Basmati Rice", "Toor Dal", "Chana Dal", "Moong Dal"]
    },
    {
      name: "Oils and Ghee",
      icon: <Kitchen fontSize="large" />,
      products: ["Sunflower Oil", "Olive Oil", "Mustard Oil", "Cow Ghee", "Vegetable Ghee"]
    }
  ];

  return (
    <Box sx={{ backgroundColor: theme.background, minHeight: "100vh" }}>
      {/* Grosnap Navbar */}
      <AppBar position="static" sx={{ backgroundColor: theme.primary }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            GROSNAP
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" startIcon={<Person />}>
              Account
            </Button>
            <Button color="inherit" startIcon={<ShoppingCart />}>
              Cart
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Delivery Info */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            🚚 Delivery in 28 MINS
          </Typography>
        </Box>

        {/* Categories Section */}
        <Typography variant="h5" sx={{ 
          mb: 2, 
          fontWeight: "bold", 
          color: theme.primary,
          borderBottom: `2px solid ${theme.secondary}`,
          pb: 1,
          width: "fit-content"
        }}>
          GROCERY & KITCHEN
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.name}>
              <Card
                onClick={() => setSelectedCategory(category.name)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedCategory === category.name ? theme.primary : "white",
                  color: selectedCategory === category.name ? "white" : theme.text,
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    backgroundColor: theme.primary,
                    color: "white",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ 
                    color: selectedCategory === category.name ? "white" : theme.primary,
                    mb: 1 
                  }}>
                    {category.icon}
                  </Box>
                  <Typography variant="subtitle1">{category.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Products Section */}
        <Typography variant="h6" sx={{ 
          mb: 2, 
          fontWeight: "bold",
          color: theme.primary
        }}>
          {selectedCategory}
        </Typography>
        <Grid container spacing={2}>
          {categories
            .find((cat) => cat.name === selectedCategory)
            ?.products.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product}>
                <Card sx={{ 
                  "&:hover": { 
                    boxShadow: `0 4px 8px rgba(0,0,0,0.2)`,
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.3s ease"
                }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: "medium" }}>
                      {product}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingBasket />}
                      sx={{ 
                        mt: 1,
                        backgroundColor: theme.secondary,
                        "&:hover": {
                          backgroundColor: "#E64A19" // Darker orange
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* Additional Categories Section */}
        <Typography variant="h5" sx={{ 
          mt: 4, 
          mb: 2, 
          fontWeight: "bold", 
          color: theme.primary,
          borderBottom: `2px solid ${theme.secondary}`,
          pb: 1,
          width: "fit-content"
        }}>
          SNACKS & DRINKS
        </Typography>
        <Grid container spacing={2}>
          {["Biscuits & Cookies", "Chips & Crisps", "Soft Drinks", "Juices"].map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item}>
              <Card sx={{
                "&:hover": {
                  backgroundColor: theme.primary,
                  color: "white",
                  "& .MuiTypography-root": {
                    color: "white"
                  }
                },
                transition: "all 0.3s ease"
              }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" sx={{ color: theme.text }}>
                    {item}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GroceryCategories;