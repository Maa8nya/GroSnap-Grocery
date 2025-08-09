import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { ShoppingBasket, LocalGroceryStore, Kitchen, BreakfastDining } from "@mui/icons-material";

const GroceryCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Fresh Vegetables");

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
      name: "Dairy, Bread and Eggs",
      icon: <Kitchen fontSize="large" />,
      products: ["Milk", "Eggs", "Cheese", "Butter", "Bread"]
    },
    {
      name: "Cereals and Breakfast",
      icon: <BreakfastDining fontSize="large" />,
      products: ["Corn Flakes", "Oats", "Muesli", "Granola", "Wheat Flakes"]
    },
    {
      name: "Atta, Rice and Dal",
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Instamart
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          28 MINS delivery
        </Typography>
      </Box>

      {/* Categories Section */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
        GROCERY & KITCHEN
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category.name}>
            <Card
              onClick={() => setSelectedCategory(category.name)}
              sx={{
                cursor: "pointer",
                backgroundColor: selectedCategory === category.name ? "#f5f5f5" : "white",
                "&:hover": { backgroundColor: "#f5f5f5" }
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Box sx={{ color: "primary.main", mb: 1 }}>{category.icon}</Box>
                <Typography variant="subtitle1">{category.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Products Section */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        {selectedCategory}
      </Typography>
      <Grid container spacing={2}>
        {categories
          .find((cat) => cat.name === selectedCategory)
          ?.products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {product}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingBasket />}
                    sx={{ mt: 1 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Additional Categories Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: "bold", color: "primary.main" }}>
        SNACKS & DRINKS
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Biscuits & Cookies</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Chips & Crisps</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Soft Drinks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Juices</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroceryCategories;