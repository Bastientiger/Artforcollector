import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.private': 'Private viewing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Buy Art. Be Smart.',
    'hero.subtitle': 'Advisory and curation services for people who value meaning, strategy, and beauty.',
    'hero.learnMore': 'Learn More',
    'hero.privateViewing': 'Private Viewing',
    
    // Services
    'services.advisory.title': 'Advisory',
    'services.advisory.desc': 'Helping individuals and companies buy the right artwork. With confidence, meaning, and smart financial strategy.',
    'services.curation.title': 'Curation',
    'services.curation.desc': 'Organizing impactful exhibitions that connect artists with new audiences in unique ways.',
    'services.private.title': 'Private viewing',
    'services.private.desc': 'A password-protected space to discover and buy curated artworks — exclusively available through Art for Collector.',
    
    // Mission
    'mission.line1': "Art shouldn't be intimidating.",
    'mission.line2': 'It should be accessible, meaningful, and transformative.',
    
    // Advisory
    'advisory.title': 'Advisory & Acquisition',
    'advisory.subtitle': "Whether you're buying your first piece or growing a collection, we guide you through every step of the process. From discovering emerging talents to securing blue-chip works, we help you make confident, informed acquisitions that align with your taste and your goals.",
    'advisory.individuals.title': 'Individuals',
    'advisory.individuals.subtitle': 'Collect with purpose',
    'advisory.individuals.desc': "You want to buy art — but you're not sure where to start. We can help you build a meaningful collection, combining personal emotion and long-term value. Whether it's one work or a whole wall, we'll find pieces that matter.",
    'advisory.individuals.cta': 'Inquire as individual',
    'advisory.companies.title': 'Companies',
    'advisory.companies.subtitle': 'Art for impact',
    'advisory.companies.desc': 'We help companies integrate contemporary art into their offices, showrooms or headquarters to enhance branding, inspire teams, and impress clients. Through direct acquisition or leasing, we have the tailored solution that fits you.',
    'advisory.companies.cta': 'Inquire as company',
    'advisory.designers.title': 'Interior Designers',
    'advisory.designers.subtitle': 'Elevate every space',
    'advisory.designers.desc': "We work closely with interior designers to source artworks that complement their vision and elevate the experience of a room. Because you're designing a space that needs more than decoration, it needs a soul. From a single statement piece to a full collection, we help you find the right work for the right place. For private homes, offices, hospitality, or retail.",
    'advisory.designers.cta': 'Inquire as designer',
    'advisory.institutions.title': 'Institutions',
    'advisory.institutions.subtitle': 'Art with a mission',
    'advisory.institutions.desc': 'We help cultural institutions source and collaborate with contemporary artists whose work resonates with their communities. Whether it\'s for museums, public spaces, or parks, we curate site-specific projects that engage, inspire, and last.',
    'advisory.institutions.cta': 'Inquire as institution',
    
    // Curation
    'curation.title': 'Curation',
    'curation.subtitle': 'Art shows that connect',
    'curation.text1': 'The location, the space, the artists, the people, the vibe.',
    'curation.text2': 'Connect artists, communities, collectors.',
    'curation.text3': 'Each show is designed as a dialogue between the space, the works, and the public. We work with international artists and build bridges between creative scenes, communities and institutions.',
    'curation.cta': 'Collaborate',
    
    // Private CTA
    'privateCTA.title1': 'A click away from',
    'privateCTA.title2': 'discovering',
    'privateCTA.title3': 'your next favorite',
    'privateCTA.title4': 'Artist.',
    'privateCTA.cta': 'Access Private Viewing',
    
    // Newsletter
    'newsletter.title': 'Join the community',
    'newsletter.email': 'Email',
    'newsletter.desc': 'Sign up now and gain early access to all of our online exhibitions, and be the first to find out about new artists and latest projects.',
    'newsletter.cta': 'Sign up',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Have a project? A question? I would be delighted to hear from you.',
    'contact.reachMe': 'You can reach me at',
    'contact.firstName': 'First Name',
    'contact.lastName': 'Last Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.subject.placeholder': 'Select a subject',
    'contact.subject.advisory': 'Art Advisory',
    'contact.subject.curation': 'Curation / Exhibition',
    'contact.subject.private': 'Private Viewing',
    'contact.subject.artist': 'I am an artist',
    'contact.subject.other': 'Other',
    'contact.message': 'Message',
    'contact.message.placeholder': 'Describe your project or question...',
    'contact.send': 'Send message',
    
    // About
    'about.p1': 'I had to do it.',
    'about.p2': "After more than ten years immersed in the art world, I realized that many people feel drawn to art but don't know where to start. They want to collect, but they lack trusted guidance.",
    'about.p3': "That's why I created Art for Collector: to offer personal, professional support and make collecting art more meaningful and rewarding.",
    'about.p4': "Whether you're a first-time buyer or a seasoned collector, I'm here to help you find the right work, at the right time, for the right reason.",
    'about.signature': 'Bastien',
    
    // Footer
    'footer.credits': 'IMAGE CREDITS',
    'footer.copyright': '© Art for collector',
    
    // Private Gallery
    'privateGallery.title': 'Private Collection',
    'privateGallery.subtitle': 'Discover our exclusive artworks selected for our collectors. Each piece is unique and comes with a certificate of authenticity.',
    'privateGallery.filter.all': 'All',
    'privateGallery.filter.available': 'Available',
    'privateGallery.filter.reserved': 'Reserved',
    'privateGallery.status.available': 'Available',
    'privateGallery.status.reserved': 'Reserved',
    'privateGallery.status.sold': 'Sold',
    'privateGallery.inquire': 'Request information',
    'privateGallery.contact': 'Looking for a specific artwork?',
    'privateGallery.contactBtn': 'Contact me',
    
    // Private Login
    'login.title': 'Private Space',
    'login.subtitle': 'Enter the access code to discover our exclusive artworks',
    'login.placeholder': 'Access code',
    'login.button': 'Access',
    'login.error': 'Incorrect password',
    'login.loading': 'Verifying...',
    'login.back': '← Back to site',
    
    // Language switcher
    'lang.fr': 'FR',
    'lang.en': 'EN',
  },
  fr: {
    // Navigation
    'nav.services': 'Services',
    'nav.private': 'Espace privé',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Buy Art. Be Smart.',
    'hero.subtitle': 'Services de conseil et de curation pour ceux qui valorisent le sens, la stratégie et la beauté.',
    'hero.learnMore': 'En savoir plus',
    'hero.privateViewing': 'Espace privé',
    
    // Services
    'services.advisory.title': 'Conseil',
    'services.advisory.desc': 'Aider les particuliers et les entreprises à acheter les bonnes œuvres. Avec confiance, sens et stratégie financière intelligente.',
    'services.curation.title': 'Curation',
    'services.curation.desc': "Organiser des expositions impactantes qui connectent les artistes avec de nouveaux publics de manière unique.",
    'services.private.title': 'Espace privé',
    'services.private.desc': 'Un espace protégé par mot de passe pour découvrir et acheter des œuvres curatoriées — exclusivement disponible via Art for Collector.',
    
    // Mission
    'mission.line1': "L'art ne devrait pas être intimidant.",
    'mission.line2': 'Il devrait être accessible, significatif et transformateur.',
    
    // Advisory
    'advisory.title': 'Conseil & Acquisition',
    'advisory.subtitle': "Que vous achetiez votre première pièce ou que vous développiez une collection, nous vous guidons à chaque étape du processus. De la découverte de talents émergents à l'acquisition d'œuvres blue-chip, nous vous aidons à faire des acquisitions confiantes et éclairées qui correspondent à votre goût et vos objectifs.",
    'advisory.individuals.title': 'Particuliers',
    'advisory.individuals.subtitle': 'Collectionner avec intention',
    'advisory.individuals.desc': "Vous voulez acheter de l'art — mais vous ne savez pas par où commencer. Nous pouvons vous aider à construire une collection significative, combinant émotion personnelle et valeur à long terme. Qu'il s'agisse d'une œuvre ou d'un mur entier, nous trouverons des pièces qui comptent.",
    'advisory.individuals.cta': 'En tant que particulier',
    'advisory.companies.title': 'Entreprises',
    'advisory.companies.subtitle': "L'art pour l'impact",
    'advisory.companies.desc': "Nous aidons les entreprises à intégrer l'art contemporain dans leurs bureaux, showrooms ou sièges pour renforcer leur image de marque, inspirer leurs équipes et impressionner leurs clients. Par acquisition directe ou location, nous avons la solution sur mesure qui vous convient.",
    'advisory.companies.cta': 'En tant qu\'entreprise',
    'advisory.designers.title': 'Architectes d\'intérieur',
    'advisory.designers.subtitle': 'Élever chaque espace',
    'advisory.designers.desc': "Nous travaillons étroitement avec les architectes d'intérieur pour sourcer des œuvres qui complètent leur vision et élèvent l'expérience d'une pièce. Parce que vous concevez un espace qui a besoin de plus qu'une décoration, il a besoin d'une âme. D'une pièce statement à une collection complète, nous vous aidons à trouver la bonne œuvre pour le bon endroit. Pour des maisons privées, bureaux, hôtellerie ou retail.",
    'advisory.designers.cta': 'En tant qu\'architecte',
    'advisory.institutions.title': 'Institutions',
    'advisory.institutions.subtitle': "L'art avec une mission",
    'advisory.institutions.desc': "Nous aidons les institutions culturelles à sourcer et collaborer avec des artistes contemporains dont l'œuvre résonne avec leurs communautés. Qu'il s'agisse de musées, d'espaces publics ou de parcs, nous curatorions des projets site-specific qui engagent, inspirent et durent.",
    'advisory.institutions.cta': 'En tant qu\'institution',
    
    // Curation
    'curation.title': 'Curation',
    'curation.subtitle': 'Des expositions qui connectent',
    'curation.text1': "Le lieu, l'espace, les artistes, les gens, l'ambiance.",
    'curation.text2': 'Connecter artistes, communautés, collectionneurs.',
    'curation.text3': "Chaque exposition est conçue comme un dialogue entre l'espace, les œuvres et le public. Nous travaillons avec des artistes internationaux et construisons des ponts entre les scènes créatives, les communautés et les institutions.",
    'curation.cta': 'Collaborer',
    
    // Private CTA
    'privateCTA.title1': 'À un clic de',
    'privateCTA.title2': 'découvrir',
    'privateCTA.title3': 'votre prochain',
    'privateCTA.title4': 'Artiste.',
    'privateCTA.cta': 'Accéder à l\'espace privé',
    
    // Newsletter
    'newsletter.title': 'Rejoindre la communauté',
    'newsletter.email': 'Email',
    'newsletter.desc': "Inscrivez-vous maintenant pour un accès anticipé à toutes nos expositions en ligne, et soyez le premier à découvrir les nouveaux artistes et les derniers projets.",
    'newsletter.cta': "S'inscrire",
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Vous avez un projet ? Une question ? Je serais ravi d\'échanger avec vous.',
    'contact.reachMe': 'Vous pouvez me joindre à',
    'contact.firstName': 'Prénom',
    'contact.lastName': 'Nom',
    'contact.email': 'Email',
    'contact.subject': 'Sujet',
    'contact.subject.placeholder': 'Sélectionnez un sujet',
    'contact.subject.advisory': 'Conseil en art',
    'contact.subject.curation': 'Curation / Exposition',
    'contact.subject.private': 'Visite privée',
    'contact.subject.artist': 'Je suis artiste',
    'contact.subject.other': 'Autre',
    'contact.message': 'Message',
    'contact.message.placeholder': 'Décrivez votre projet ou votre question...',
    'contact.send': 'Envoyer le message',
    
    // About
    'about.p1': 'Je devais le faire.',
    'about.p2': "Après plus de dix ans dans le monde de l'art, j'ai réalisé que beaucoup de gens sont attirés par l'art mais ne savent pas par où commencer. Ils veulent collectionner, mais ils manquent de conseils de confiance.",
    'about.p3': "C'est pourquoi j'ai créé Art for Collector : pour offrir un accompagnement personnel et professionnel et rendre la collection d'art plus significative et gratifiante.",
    'about.p4': "Que vous soyez un acheteur novice ou un collectionneur chevronné, je suis là pour vous aider à trouver la bonne œuvre, au bon moment, pour la bonne raison.",
    'about.signature': 'Bastien',
    
    // Footer
    'footer.credits': 'CRÉDITS IMAGES',
    'footer.copyright': '© Art for collector',
    
    // Private Gallery
    'privateGallery.title': 'Collection Privée',
    'privateGallery.subtitle': 'Découvrez nos œuvres exclusives sélectionnées pour nos collectionneurs. Chaque pièce est unique et accompagnée d\'un certificat d\'authenticité.',
    'privateGallery.filter.all': 'Toutes',
    'privateGallery.filter.available': 'Disponibles',
    'privateGallery.filter.reserved': 'Réservées',
    'privateGallery.status.available': 'Disponible',
    'privateGallery.status.reserved': 'Réservée',
    'privateGallery.status.sold': 'Vendue',
    'privateGallery.inquire': 'Demander des informations',
    'privateGallery.contact': 'Vous recherchez une œuvre spécifique ?',
    'privateGallery.contactBtn': 'Me contacter',
    
    // Private Login
    'login.title': 'Espace Privé',
    'login.subtitle': 'Entrez le code d\'accès pour découvrir nos œuvres exclusives',
    'login.placeholder': 'Code d\'accès',
    'login.button': 'Accéder',
    'login.error': 'Mot de passe incorrect',
    'login.loading': 'Vérification...',
    'login.back': '← Retour au site',
    
    // Language switcher
    'lang.fr': 'FR',
    'lang.en': 'EN',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
