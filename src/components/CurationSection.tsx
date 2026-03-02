import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const curationImages = [
  '/images/curation-1.jpg?v=2',
  '/images/curation-2.jpg?v=2',
  '/images/curation-3.jpg?v=2',
];

export function CurationSection() {
  const { t } = useLanguage();

  return (
    <section id="curation" className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-art-blue mb-4">
              {t('curation.title')}
            </h2>
            <p className="text-art-blue text-sm font-medium mb-6 flex items-center gap-2">
              {t('curation.subtitle')} <ArrowRight className="w-4 h-4" />
            </p>
            
            <div className="space-y-4 mb-8">
              <p className="text-art-blue text-xl lg:text-2xl font-serif">
                {t('curation.text1')}
              </p>
              <p className="text-art-blue text-lg lg:text-xl font-serif">
                {t('curation.text2')}
              </p>
              <p className="text-art-muted text-sm leading-relaxed">
                {t('curation.text3')}
              </p>
            </div>
            
            <a href="#contact">
              <Button
                variant="outline"
                className="rounded-pill border-art-blue text-art-blue hover:bg-art-blue/5 px-6 py-3 h-auto text-sm font-medium"
              >
                {t('curation.cta')}
              </Button>
            </a>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {curationImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`Curation project ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-art-blue border-0" />
              <CarouselNext className="right-4 bg-white/80 hover:bg-white text-art-blue border-0" />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
