import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceCards } from './components/ServiceCards';
import { MissionStatement } from './components/MissionStatement';
import { AboutSection } from './components/AboutSection';
import { AdvisorySection } from './components/AdvisorySection';
import { CurationSection } from './components/CurationSection';
import { PrivateViewingCTA } from './components/PrivateViewingCTA';
import { Newsletter } from './components/Newsletter';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrivateRoute } from './components/PrivateRoute';
import { PrivateLogin } from './pages/PrivateLogin';
import { PrivateGallery } from './pages/PrivateGallery';

// Page d'accueil complète
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServiceCards />
        <MissionStatement />
        <AboutSection />
        <AdvisorySection />
        <CurationSection />
        <PrivateViewingCTA />
        <Newsletter />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<HomePage />} />
        
        {/* Page de login privé */}
        <Route path="/private" element={<PrivateLogin />} />
        
        {/* Page des œuvres en vente (protégée) */}
        <Route
          path="/private/gallery"
          element={
            <PrivateRoute>
              <PrivateGallery />
            </PrivateRoute>
          }
        />
         </Routes>
      
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
