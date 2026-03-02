import { useLanguage } from '@/i18n/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-white text-art-blue shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {t('lang.en')}
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'fr'
            ? 'bg-white text-art-blue shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {t('lang.fr')}
      </button>
    </div>
  );
}
