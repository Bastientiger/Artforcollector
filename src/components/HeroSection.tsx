import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Art gallery interior"
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-hero text-art-blue mb-6"
        >
          Buy <span className="hero-highlight">Art</span>. Be Sm<span className="hero-highlight">art</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-art-blue text-base sm:text-lg max-w-2xl mx-auto mb-10"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="outline"
            className="rounded-pill border-art-blue text-art-blue hover:bg-art-blue/5 px-6 py-3 h-auto text-sm font-medium"
            asChild
          >
            <a href="#services">
              {t('hero.learnMore')}
            </a>
          </Button>
          <Button
            className="rounded-pill bg-art-blue text-white hover:bg-art-blue-dark px-6 py-3 h-auto text-sm font-medium"
            asChild
          >
            <a href="#private-viewing">
              {t('hero.privateViewing')}
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-art-blue rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-art-blue rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
