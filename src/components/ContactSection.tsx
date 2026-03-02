import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    youAre: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`[${formData.subject}] Message from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `You are: ${formData.youAre}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    );

    // Open email client
    window.location.href = `mailto:bastien@artforcollector.com?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setIsSent(true);

    // Reset form after a delay
    setTimeout(() => {
      setFormData({ firstName: '', lastName: '', email: '', youAre: '', subject: '', message: '' });
      setIsSent(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-section text-art-blue mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-art-muted text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-art-blue text-xl font-semibold mb-4">
                {t('contact.reachMe')}
              </h3>
              <a 
                href="mailto:bastien@artforcollector.com"
                className="group flex items-center gap-3 text-art-blue hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-art-blue/10 rounded-full flex items-center justify-center group-hover:bg-art-blue/20 transition-colors">
                  <Mail className="w-5 h-5 text-art-blue" />
                </div>
                <span className="text-lg">bastien@artforcollector.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/artforcollector/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-art-blue/10 rounded-full flex items-center justify-center hover:bg-art-blue hover:text-white text-art-blue transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/bbft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-art-blue/10 rounded-full flex items-center justify-center hover:bg-art-blue hover:text-white text-art-blue transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {isSent ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-700 font-medium">Message sent! Opening your email client...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-art-blue text-sm font-medium mb-2">
                      {t('contact.firstName')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md px-4 py-3 focus:border-art-blue focus:ring-1 focus:ring-art-blue outline-none transition-colors"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-art-blue text-sm font-medium mb-2">
                      {t('contact.lastName')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-md px-4 py-3 focus:border-art-blue focus:ring-1 focus:ring-art-blue outline-none transition-colors"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-art-blue text-sm font-medium mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-md px-4 py-3 focus:border-art-blue focus:ring-1 focus:ring-art-blue outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* You are dropdown */}
                <div>
                  <label className="block text-art-blue text-sm font-medium mb-2">
                    You are:
                  </label>
                  <select 
                    name="youAre"
                    value={formData.youAre}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 focus:border-art-blue focus:ring-1 focus:ring-art-blue outline-none transition-colors bg-white"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Individual">Individual</option>
                    <option value="Interior designer">Interior designer</option>
                    <option value="Company">Company</option>
                    <option value="Institution">Institution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-art-blue text-sm font-medium mb-2">
                    {t('contact.subject')}
                  </label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 focus:border-art-blue focus:ring-1 focus:ring-art-blue outline-none transition-colors bg-white"
                    required
                  >
                    <option value="">{t('contact.subject.placeholder')}</option>
                    <option value="advisory">{t('contact.subject.advisory')}</option>
                    <option value="curation">{t('contact.subject.curation')}</option>
                    <option value="private">{t('contact.subject.private')}</option>
                    <option value="artist">{t('contact.subject.artist')}</option>
                    <option value="other">{t('contact.subject.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-art-blue text-sm font-medium mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full border border-gray-200 rounded-md px-4 py-3 focus:border-art-blue focus:ring-1 focus:ring-art-blue outline-none transition-colors resize-none"
                    placeholder={t('contact.message.placeholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-pill bg-art-blue text-white hover:bg-art-blue-dark px-8 py-3 font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : t('contact.send')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
