import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div style={styles.landingPage}>
      {/* Animated Header */}
      <motion.header 
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={styles.headerContent}>
          <motion.h1 
            style={styles.title}
            whileHover={{ scale: 1.02 }}
          >
            GROW WITH GROSNAP
          </motion.h1>
          <motion.p 
            style={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Fresh groceries delivered to your doorstep in minutes
          </motion.p>
          <motion.div 
            style={styles.headerImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div style={styles.headerImagePlaceholder}>
              <div style={styles.headerImageOverlay}></div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 style={styles.heroTitle}>Premium Grocery Delivery Service</h2>
              <p style={styles.heroSubtitle}>
                Get the freshest produce, pantry staples, and household essentials delivered 
                straight to your door with our lightning-fast service.
              </p>
              <button style={styles.primaryButton}>Shop Now</button>
            </motion.div>
            
            <motion.div 
              style={styles.heroImage}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div style={styles.heroImagePlaceholder}>
                <div style={styles.heroImageOverlay}></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section style={styles.features}>
          <motion.h3 
            style={styles.sectionTitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Grosnap
          </motion.h3>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                style={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h4 style={styles.featureTitle}>{feature.title}</h4>
                <p style={styles.featureText}>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <motion.div 
            style={styles.ctaContainer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div style={styles.ctaBox}>
              <h3 style={styles.ctaTitle}>Do you own a shop?</h3>
              <p style={styles.ctaText}>Expand your customer base and increase sales with our platform</p>
              <button style={styles.secondaryButton}>Join as Seller</button>
            </div>

            <div style={styles.orDivider}>
              <span style={styles.orText}>OR</span>
            </div>

            <div style={styles.ctaBox}>
              <div style={styles.customerImage}>
                <div style={styles.customerImagePlaceholder}>
                  <div style={styles.customerImageOverlay}></div>
                </div>
              </div>
              <h3 style={styles.ctaTitle}>Direct Shop Connection</h3>
              <p style={styles.ctaText}>Connect directly with shopkeepers for personalized service</p>
              <button style={styles.secondaryButton}>Contact Shopkeeper</button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer 
        style={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>GROSNAP</div>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>About Us</a>
            <a href="#" style={styles.footerLink}>Contact</a>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Service</a>
          </div>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialIcon}>FB</a>
            <a href="#" style={styles.socialIcon}>IG</a>
            <a href="#" style={styles.socialIcon}>TW</a>
          </div>
        </div>
        <div style={styles.copyright}>
          © 2025 GROSNAP. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

// Features data
const features = [
  {
    icon: '🚚',
    title: 'Fast Delivery',
    text: 'Get your groceries delivered in as little as 30 minutes'
  },
  {
    icon: '🛒',
    title: 'Wide Selection',
    text: 'Thousands of products from local shops and markets'
  },
  {
    icon: '💰',
    title: 'Best Prices',
    text: 'Competitive pricing with no hidden fees'
  },
  {
    icon: '🌟',
    title: 'Quality Guarantee',
    text: 'Only the freshest products hand-picked for you'
  }
];

// All styles defined as JavaScript objects
const styles = {
  landingPage: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#f8f9fa',
    color: '#333',
    lineHeight: 1.6
  },
  
  // Header Styles
  header: {
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '2rem 1rem',
    position: 'relative',
    overflow: 'hidden'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
    padding: '2rem 0'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: '700',
    textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
    letterSpacing: '1px'
  },
  tagline: {
    fontSize: '1.4rem',
    fontWeight: '300',
    maxWidth: '600px',
    marginBottom: '2rem'
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%'
  },
  headerImagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #81c784 0%, #4caf50 100%)',
    opacity: 0.8
  },
  headerImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 70% 50%, transparent 20%, rgba(0,0,0,0.1) 100%)'
  },
  
  // Hero Section
  hero: {
    padding: '5rem 1rem',
    backgroundColor: 'white'
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '3rem'
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
    color: '#2e7d32',
    lineHeight: 1.2
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    color: '#555',
    maxWidth: '500px'
  },
  heroImage: {
    flex: 1,
    minWidth: '400px'
  },
  heroImagePlaceholder: {
    width: '100%',
    height: '400px',
    borderRadius: '12px',
    backgroundColor: '#e8f5e9',
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden'
  },
  heroImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #a5d6a7 0%, #81c784 50%, #66bb6a 100%)',
    opacity: 0.8
  },
  
  // Features Section
  features: {
    padding: '5rem 1rem',
    backgroundColor: '#f5f5f5'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.2rem',
    marginBottom: '3rem',
    color: '#2e7d32',
    fontWeight: '600'
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem'
  },
  featureTitle: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    color: '#2e7d32',
    fontWeight: '600'
  },
  featureText: {
    color: '#666',
    fontSize: '0.95rem'
  },
  
  // CTA Section
  ctaSection: {
    padding: '5rem 1rem',
    backgroundColor: 'white'
  },
  ctaContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '3rem'
  },
  ctaBox: {
    flex: 1,
    minWidth: '300px',
    maxWidth: '400px',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    textAlign: 'center',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    transition: 'all 0.3s ease'
  },
  ctaTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#2e7d32',
    fontWeight: '600'
  },
  ctaText: {
    marginBottom: '1.5rem',
    color: '#666',
    fontSize: '0.95rem'
  },
  customerImage: {
    height: '200px',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  customerImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e8f5e9',
    position: 'relative'
  },
  customerImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)'
  },
  orDivider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    margin: '1rem 0'
  },
  orText: {
    display: 'inline-block',
    padding: '0 1rem',
    backgroundColor: 'white',
    color: '#666',
    fontWeight: '600',
    zIndex: 1
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    minWidth: '180px',
    ':hover': {
      backgroundColor: '#1b5e20',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
    }
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#2e7d32',
    border: '2px solid #2e7d32',
    padding: '0.8rem 2rem',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '180px',
    ':hover': {
      backgroundColor: '#2e7d32',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
    }
  },
  
  // Footer
  footer: {
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '3rem 1rem 1.5rem'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '2rem',
    marginBottom: '2rem'
  },
  footerLogo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem'
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  footerLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    ':hover': {
      color: 'white'
    }
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem'
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.2)'
    }
  },
  copyright: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.9rem'
  },
  
  // Media Queries
  '@media (max-width: 992px)': {
    heroContent: {
      flexDirection: 'column',
      textAlign: 'center'
    },
    heroImage: {
      minWidth: '100%'
    },
    heroTitle: {
      maxWidth: '100%'
    },
    heroSubtitle: {
      maxWidth: '100%'
    }
  },
  '@media (max-width: 768px)': {
    title: {
      fontSize: '2.2rem'
    },
    tagline: {
      fontSize: '1.2rem'
    },
    heroTitle: {
      fontSize: '2rem'
    },
    ctaContainer: {
      flexDirection: 'column'
    },
    orDivider: {
      width: '100%',
      '::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '1px',
        backgroundColor: '#e0e0e0'
      }
    }
  },
  '@media (max-width: 576px)': {
    title: {
      fontSize: '1.8rem'
    },
    heroTitle: {
      fontSize: '1.6rem'
    },
    sectionTitle: {
      fontSize: '1.8rem'
    }
  }
};

export default LandingPage;