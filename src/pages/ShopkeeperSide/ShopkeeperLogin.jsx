import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
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
  Lock,
  ArrowBack
} from '@mui/icons-material';

const ShopkeeperLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
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
              maxWidth: '500px',
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
                Shopkeeper Login
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access your shop dashboard and manage orders
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
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
              </Box>
              <Box sx={{ mb: 2 }}>
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
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      name="rememberMe" 
                      checked={formData.rememberMe} 
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link 
                  to="/shopkeeper/forgot-password" 
                  style={{ 
                    color: shopkeeperTheme.palette.primary.main,
                    fontSize: '0.875rem'
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  sx={{ py: 1.5, borderRadius: 2, mb: 2 }}
                >
                  Login to Dashboard
                </Button>
              </motion.div>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  sx={{ py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate('/shopkeeper/register')}
                >
                  Create New Account
                </Button>
              </motion.div>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default ShopkeeperLogin;