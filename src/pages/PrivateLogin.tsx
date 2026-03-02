import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

// Mot de passe - Tu peux le changer ici ou utiliser une variable d'environnement
const PRIVATE_PASSWORD = 'art2024'; // Change ce mot de passe !

export function PrivateLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/private/gallery';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulation d'un délai pour la sécurité
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === PRIVATE_PASSWORD) {
      localStorage.setItem('art-collector-auth', 'true');
      navigate(from, { replace: true });
    } else {
      setError(t('login.error'));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-art-blue/10 rounded-full mb-4">
            <Lock className="w-8 h-8 text-art-blue" />
          </div>
          <h1 className="font-serif text-3xl text-art-blue mb-2">
            {t('login.title')}
          </h1>
          <p className="text-art-muted">
            {t('login.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.placeholder')}
              className="w-full pr-12 py-3 h-auto border-gray-200 focus:border-art-blue focus:ring-art-blue"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full rounded-pill bg-art-blue text-white hover:bg-art-blue-dark py-3 h-auto"
          >
            {isLoading ? t('login.loading') : t('login.button')}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-art-blue text-sm hover:underline">
            {t('login.back')}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
