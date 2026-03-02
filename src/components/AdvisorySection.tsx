import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';

export function AdvisorySection() {
  const { t } = useLanguage();

  const clients = [
    {
      type: t('advisory.individuals.title'),
      subtitle: t('advisory.individuals.subtitle'),
      description: t('advisory.individuals.desc'),
      cta: t('advisory.individuals.cta'),
      image: '/images/individuals.jpg',
    },
    {
      type: t('advisory.companies.title'),
      subtitle: t('advisory.companies.subtitle'),
      description: t('advisory.companies.desc'),
      cta: t('advisory.companies.cta'),
      image: '/images/companies.jpg',
    },
    {
      type: t('advisory.designers.title'),
      subtitle: t('advisory.designers.subtitle'),
      description: t('advisory.designers.desc'),
      cta: t('advisory.designers.cta'),
      image: '/images/designers.jpg',
    },
    {
      type: t('advisory.institutions.title'),
      subtitle: t('advisory.institutions.subtitle'),
      description: t('advisory.institutions.desc'),
      cta: t('advisory.institutions.cta'),
      image: '/images/institutions.jpg',
    },
  ];

  return (
    <section id="advisory" className="py-20 lg:py-32 bg-art-bg-alt">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-art-blue mb-6">
            {t('advisory.title')}
          </h2>
          <p className="text-art-muted text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            {t('advisory.subtitle')}
          </p>
        </motion.div>

        {/* Client Cards */}
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {clients.map((client) => (
            <motion.div
              key={client.type}
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
              <Card className="overflow-hidden bg-white border-0 shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Image */}
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <img
                      src={client.image}
                      alt={`${client.type} - ${client.subtitle}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
                    <h3 className="text-art-blue text-xl lg:text-2xl font-semibold mb-1">
                      {client.type}
                    </h3>
                    <p className="text-art-blue text-sm italic mb-4">
                      — {client.subtitle}
                    </p>
                    <p className="text-art-muted text-sm leading-relaxed mb-6">
                      {client.description}
                    </p>
                    <a href="#contact">
                      <Button
                        className="rounded-pill bg-art-blue text-white hover:bg-art-blue-dark px-5 py-2 h-auto text-sm font-medium w-fit"
                      >
                        {client.cta}
                      </Button>
                    </a>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
