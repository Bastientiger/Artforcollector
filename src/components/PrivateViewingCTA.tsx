import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const artworks = [
  '/images/artwork-1.jpg?v=2',
  '/images/artwork-2.jpg?v=2',
  '/images/artwork-3.jpg?v=2',
  '/images/artwork-4.jpg?v=2',
  '/images/artwork-5.jpg?v=2',
  '/images/artwork-6.jpg?v=2',
];

export function PrivateViewingCTA() {
  const { t } = useLanguage();

  return (
    <section id="private-viewing" className="py-20 lg:py-32 bg-art-bg-alt">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-art-blue mb-8">
            {t('privateCTA.title1')}{' '}
            <span className="italic">{t('privateCTA.title2')}</span>
            <br />
            {t('privateCTA.title3')}{' '}
            <span className="italic">{t('privateCTA.title4')}</span>
          </h2>
          <Button
            className="rounded-pill bg-art-blue text-white hover:bg-art-blue-dark px-8 py-3 h-auto text-sm font-medium"
            asChild
          >
            <a href="/private">{t('privateCTA.cta')}</a>
          </Button>
        </motion.div>

        {/* Artwork Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {artworks.map((artwork, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              style={{ willChange: 'transform, opacity' }}
              className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                index === 0 ? 'col-span-2 md:col-span-1 aspect-square' : 'aspect-square'
              }`}
            >
              <img
                src={artwork}
                alt={`Artwork ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-art-blue/0 group-hover:bg-art-blue/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
