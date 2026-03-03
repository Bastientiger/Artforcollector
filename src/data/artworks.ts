import type { Artwork } from '@/components/ArtworkGallery';

// Fichier de fallback - les données viennent maintenant d'Airtable
// Ce fichier est conservé pour compatibilité mais n'est plus utilisé directement

export const artworksForSale: Artwork[] = [
  {
    id: 1,
    title: 'Abstract Composition',
    artist: 'Marie Dubois',
    year: '2023',
    medium: 'Oil on canvas',
    dimensions: '80 x 100 cm',
    price: '€4,500',
    images: ['/images/artwork-1.jpg'],  // ← tableau
    description: 'A vibrant abstract composition exploring color and form.',
    status: 'available',
  },
  {
    id: 2,
    title: 'Urban Landscape',
    artist: 'Jean-Pierre Martin',
    year: '2022',
    medium: 'Acrylic on canvas',
    dimensions: '120 x 90 cm',
    price: '€6,200',
    images: ['/images/artwork-2.jpg'],  // ← tableau
    description: 'A contemporary interpretation of urban architecture.',
    status: 'reserved',
  },
  {
    id: 3,
    title: 'Portrait Study',
    artist: 'Sophie Laurent',
    year: '2023',
    medium: 'Mixed media',
    dimensions: '60 x 80 cm',
    price: '€3,800',
    images: ['/images/artwork-3.jpg'],  // ← tableau
    description: 'An intimate portrait study with mixed media techniques.',
    status: 'available',
  },
  {
    id: 4,
    title: 'Nature Series #4',
    artist: 'Lucas Bernard',
    year: '2021',
    medium: 'Watercolor',
    dimensions: '50 x 70 cm',
    price: '€2,900',
    images: ['/images/artwork-4.jpg'],  // ← tableau
    description: 'Part of an ongoing exploration of natural forms.',
    status: 'available',
  },
  {
    id: 5,
    title: 'Geometric Forms',
    artist: 'Emma Petit',
    year: '2023',
    medium: 'Oil on canvas',
    dimensions: '100 x 100 cm',
    price: '€5,500',
    images: ['/images/artwork-5.jpg'],  // ← tableau
    description: 'Bold geometric forms in a minimalist composition.',
    status: 'reserved',
  },
  {
    id: 6,
    title: 'Evening Light',
    artist: 'Thomas Leroy',
    year: '2022',
    medium: 'Oil on canvas',
    dimensions: '90 x 120 cm',
    price: '€7,800',
    images: ['/images/artwork-6.jpg'],  // ← tableau
    description: 'Capturing the ephemeral quality of evening light.',
    status: 'available',
  },
];

export const featuredArtworks: Artwork[] = artworksForSale.slice(0, 3);
