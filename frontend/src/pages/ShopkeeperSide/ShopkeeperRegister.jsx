import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../../../firebase.js';

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
  Checkbox,
  Alert
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeTerms' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('[DEBUG] Form submission started');
    console.log('[DEBUG] Event prevented');
    
    // CRITICAL: Set loading IMMEDIATELY to prevent multiple submissions
    if (loading) {
      console.log('[DEBUG] Already processing, ignoring submission');
      return;
    }
    
    setLoading(true);
    setError('');

    console.log('[DEBUG] Form data:', formData);
    console.log('[DEBUG] Auth object:', auth);
    console.log('[DEBUG] DB object:', db);

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Add a small delay to see the loading state
    console.log('[DEBUG] Starting Firebase operations...');

    try {
      console.log('[Register] Step 1: Creating user with email:', formData.email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      console.log('[Register] Step 2: User created successfully');
      console.log('[Register] User UID:', user.uid);
      console.log('[Register] User email:', user.email);
      console.log('[Register] User object:', user);

      // Wait a moment for auth to propagate
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create the store document data
      const storeData = {
        shopName: formData.shopName,
        items: [],
        ownerName: formData.name,
        ownerEmail: formData.email,
        phone: formData.phone,
        shopAddress: formData.shopAddress,
        createdAt: new Date(),
        userId: user.uid,
        // Add some debug fields
        debugCreatedAt: Date.now(),
        debugTimestamp: new Date().toISOString()
      };

      console.log('[Register] Step 3: Attempting to save store data');
      console.log('[Register] Store data to save:', storeData);
      console.log('[Register] Document path: stores/' + user.uid);
      console.log('[Register] Current auth user:', auth.currentUser);
      
      // Try to create the document
      const storeDocRef = doc(db, "stores", user.uid);
      console.log('[Register] Document reference created:', storeDocRef);
      
      await setDoc(storeDocRef, storeData);
      
      console.log('[Register] Step 4: Store data saved successfully to Firestore');
      
      // Set the localStorage flag that ShopkeeperManagement expects
      localStorage.setItem('shopkeeperRegistered', 'true');
      
      // Verify the data was saved by trying to read it back
      try {
        const { getDoc } = await import('firebase/firestore');
        const docSnap = await getDoc(storeDocRef);
        if (docSnap.exists()) {
          console.log('[Register] Step 5: Verification successful - document exists with data:', docSnap.data());
        } else {
          console.log('[Register] Step 5: WARNING - Document does not exist after creation');
        }
      } catch (verifyError) {
        console.error('[Register] Step 5: Error verifying document:', verifyError);
      }
      
      // Only navigate if everything was successful
      console.log('[DEBUG] About to show success alert');
      alert('Registration successful! Welcome to GroSnap!');
      
      console.log('[DEBUG] About to navigate');
      navigate('/shopkeeper/manage');

    } catch (error) {
      console.error('[Register] ERROR CAUGHT:');
      console.error('[Register] Full error object:', error);
      console.error('[Register] Error name:', error.name);
      console.error('[Register] Error code:', error.code);
      console.error('[Register] Error message:', error.message);
      console.error('[Register] Error stack:', error.stack);
      
      // Handle specific Firebase errors
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please use a different email or login.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please choose a stronger password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'permission-denied':
            errorMessage = 'Permission denied. Please check Firestore rules and try again.';
            break;
          case 'unavailable':
            errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
            break;
          default:
            errorMessage = `Registration failed: ${error.code} - ${error.message}`;
        }
      } else {
        errorMessage = `Registration failed: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('[Register] Process completed, loading set to false');
    }
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
            <Box sx={{ mb: 4, textAlign: 'center', position: 'relative' }}>
              <Button 
                startIcon={<ArrowBack />} 
                sx={{ position: 'absolute', left: 0, top: 0 }}
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

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

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
                    helperText="Minimum 6 characters"
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
                    error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
                    helperText={formData.password !== formData.confirmPassword && formData.confirmPassword !== '' ? "Passwords don't match" : ""}
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
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.99 }}
                  >
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                      disabled={!formData.agreeTerms || loading}
                      sx={{ py: 1.5, borderRadius: 2 }}
                      onClick={(e) => {
                        console.log('[DEBUG] Button clicked, loading state:', loading);
                        if (loading) {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('[DEBUG] Prevented submission - already loading');
                          return false;
                        }
                      }}
                    >
                      {loading ? 'Registering Your Shop...' : 'Register My Shop'}
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