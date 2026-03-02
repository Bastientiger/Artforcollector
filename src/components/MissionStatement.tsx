import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export function MissionStatement() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated Sky Background */}
      <div className="absolute inset-0 z-0">
        {/* Base sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />
        
        {/* Animated clouds layer 1 - slower */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url('/images/sky-bg.jpg')`,
            backgroundSize: '200% 100%',
            backgroundPosition: '0% 50%',
            animation: 'cloudMove1 60s linear infinite',
          }}
        />
        
        {/* Animated clouds layer 2 - faster, different position */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('/images/sky-bg.jpg')`,
            backgroundSize: '150% 100%',
            backgroundPosition: '50% 30%',
            animation: 'cloudMove2 40s linear infinite',
            transform: 'scaleX(-1)',
          }}
        />
        
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* CSS Animation keyframes */}
      <style>{`
        @keyframes cloudMove1 {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes cloudMove2 {
          0% { background-position: 100% 30%; }
          100% { background-position: 0% 30%; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="space-y-4"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
              }}
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-section font-serif leading-relaxed drop-shadow-lg"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
            >
              {t('mission.line1')}
            </motion.p>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
              }}
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-section font-serif leading-relaxed drop-shadow-lg"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
            >
              {t('mission.line2')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
