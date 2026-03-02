import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut, Mail } from 'lucide-react';
import { ArtworkGallery } from '@/components/ArtworkGallery';
import { artworksForSale } from '@/data/artworks';
import { useLanguage } from '@/i18n/LanguageContext';

export function PrivateGallery() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('art-collector-auth');
    navigate('/private');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex flex-col leading-none">
              <span className="text-art-blue font-bold text-2xl tracking-tight">Art</span>
              <span className="text-art-blue text-xs">for collector</span>
            </a>
            
            <div className="flex items-center gap-4">
              <span className="text-art-muted text-sm hidden sm:inline">
                {t('login.title')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="rounded-pill border-art-blue text-art-blue hover:bg-art-blue/5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-art-blue mb-4">
              {t('privateGallery.title')}
            </h1>
            <p className="text-art-muted max-w-2xl mx-auto">
              {t('privateGallery.subtitle')}
            </p>
          </motion.div>

          {/* Gallery */}
          <ArtworkGallery 
            artworks={artworksForSale}
            showFilters={true}
          />

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-art-muted mb-4">
              {t('privateGallery.contact')}
            </p>
            <a
              href="mailto:bastien@artforcollector.com"
              className="inline-flex items-center gap-2 rounded-pill border border-art-blue text-art-blue hover:bg-art-blue hover:text-white px-6 py-3 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t('privateGallery.contactBtn')}
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
