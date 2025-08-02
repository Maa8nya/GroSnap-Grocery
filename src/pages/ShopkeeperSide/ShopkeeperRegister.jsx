import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  InputAdornment,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import shopkeeperTheme from '../../themes/shopkeeperTheme';
import { 
  Store, 
  Visibility, 
  VisibilityOff, 
  Phone, 
  Email, 
  Person, 
  Home,
  Lock,
  ArrowBack
} from '@mui/icons-material';

const ShopkeeperRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shopName: '',
    shopAddress: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeTerms' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Form submitted:', formData);
    navigate('/shopkeeper');
  };

  return (
    <ThemeProvider theme={shopkeeperTheme}>
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 4 }, 
              borderRadius: 4,
              maxWidth: '800px',
              width: '100%'
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Button 
                startIcon={<ArrowBack />} 
                sx={{ position: 'absolute', left: 20, top: 20 }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Store sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Register Your Shop
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Join GroSnap and grow your business with local customers
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Shop Name"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Shop Address"
                    name="shopAddress"
                    value={formData.shopAddress}
                    onChange={handleChange}
                    required
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="agreeTerms" 
                        checked={formData.agreeTerms} 
                        onChange={handleChange}
                        color="primary"
                        required
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the <Link to="/terms" style={{ color: shopkeeperTheme.palette.primary.main }}>Terms and Conditions</Link> and <Link to="/privacy" style={{ color: shopkeeperTheme.palette.primary.main }}>Privacy Policy</Link>
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                      disabled={!formData.agreeTerms}
                      sx={{ py: 1.5, borderRadius: 2 }}
                    >
                      Register My Shop
                    </Button>
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" textAlign="center">
                    Already have an account?{' '}
                    <Link 
                      to="/shopkeeper/login" 
                      style={{ 
                        color: shopkeeperTheme.palette.primary.main,
                        fontWeight: 'bold'
                      }}
                    >
                      Login here
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default ShopkeeperRegister;