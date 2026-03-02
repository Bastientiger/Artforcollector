import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function ServiceCards() {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.advisory.title'),
      description: t('services.advisory.desc'),
      link: '#advisory',
    },
    {
      title: t('services.curation.title'),
      description: t('services.curation.desc'),
      link: '#curation',
    },
    {
      title: t('services.private.title'),
      description: t('services.private.desc'),
      link: '#private-viewing',
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              <a href={service.link} className="block h-full">
                <Card className="h-full bg-white border-0 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-art-blue text-xl lg:text-2xl font-semibold">
                        {service.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-art-blue" />
                    </div>
                    <p className="text-art-muted text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
