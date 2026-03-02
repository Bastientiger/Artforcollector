import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Menu, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.services'), href: '#services', hasArrow: true },
    { label: t('nav.private'), href: '/private', hasArrow: true },
    { label: t('nav.about'), href: '#about', hasArrow: true },
    { label: t('nav.contact'), href: '#contact', hasArrow: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none">
            <span className="text-art-blue font-bold text-4xl tracking-tight">Art</span>
            <span className="text-art-blue text-sm">for collector</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1 text-art-blue text-sm font-medium hover:opacity-80 transition-opacity"
              >
                {link.hasArrow && (
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Icons & Language */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button
              className="text-art-blue hover:opacity-80 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6 fill-art-blue" />
            </button>
            <button
              className="text-art-blue hover:opacity-80 transition-opacity hidden sm:block"
              aria-label="Account"
            >
              <User className="w-6 h-6" />
            </button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden text-art-blue hover:opacity-80 transition-opacity"
                  aria-label="Menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="mb-4">
                    <LanguageSwitcher />
                  </div>
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center gap-2 text-art-blue text-lg font-medium hover:opacity-80 transition-opacity"
                    >
                      {link.hasArrow && (
                        <ArrowRight className="w-4 h-4" />
                      )}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
