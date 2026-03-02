import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/i18n/LanguageContext';

export function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send email to bastien@artforcollector.com
    const subject = encodeURIComponent('New newsletter subscription');
    const body = encodeURIComponent(`New subscriber email: ${email}`);
    window.location.href = `mailto:bastien@artforcollector.com?subject=${subject}&body=${body}`;
    
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-art-blue mb-2">
              {t('newsletter.title')}
            </h2>
          </div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-green-700 font-medium">Thank you! Opening your email client...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="email" className="block text-art-blue text-sm font-medium mb-2">
                    {t('newsletter.email')} <span className="text-art-blue">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    required
                    className="w-full border-gray-200 focus:border-art-blue focus:ring-art-blue rounded-md px-4 py-3"
                  />
                </div>
              </div>

              <p className="text-art-muted text-sm leading-relaxed">
                {t('newsletter.desc')}
              </p>

              <Button
                type="submit"
                className="rounded-pill bg-art-blue text-white hover:bg-art-blue-dark px-8 py-3 h-auto text-sm font-medium w-full sm:w-auto"
              >
                {t('newsletter.cta')}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
