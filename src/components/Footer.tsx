import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.private'), href: '/private' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          {/* Large Logo */}
          <div className="mb-12">
            <a href="#" className="inline-flex flex-col leading-none">
              <span className="text-art-blue font-bold text-6xl sm:text-7xl lg:text-8xl tracking-tight">Art</span>
              <span className="text-art-blue text-xl sm:text-2xl">for collector</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-12">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1 text-art-blue text-sm font-medium hover:opacity-80 transition-opacity"
              >
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-art-muted text-xs space-y-2">
            <p>{t('footer.credits')}</p>
            <p>{t('footer.copyright')}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
