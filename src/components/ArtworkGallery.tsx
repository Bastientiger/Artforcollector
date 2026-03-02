import { motion } from 'framer-motion';
import { Mail, Heart, Expand } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  price: string;
  image: string;
  description: string;
  status?: 'available' | 'reserved' | 'sold';
}

interface ArtworkGalleryProps {
  artworks: Artwork[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

export function ArtworkGallery({ 
  artworks, 
  title,
  subtitle,
  showFilters = false 
}: ArtworkGalleryProps) {
  const { t } = useLanguage();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'reserved'>('all');

  const filteredArtworks = filter === 'all' 
    ? artworks 
    : artworks.filter(a => a.status === filter || (filter === 'available' && !a.status));

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'sold': return { text: t('privateGallery.status.sold'), color: 'bg-gray-500' };
      case 'reserved': return { text: t('privateGallery.status.reserved'), color: 'bg-orange-500' };
      default: return { text: t('privateGallery.status.available'), color: 'bg-green-500' };
    }
  };

  return (
    <div>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl text-art-blue mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-art-muted max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="flex justify-center gap-4 mb-10">
          {(['all', 'available', 'reserved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-art-blue text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? t('privateGallery.filter.all') : f === 'available' ? t('privateGallery.filter.available') : t('privateGallery.filter.reserved')}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredArtworks.map((artwork) => (
          <motion.div
            key={artwork.id}
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
            className="group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Status Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusLabel(artwork.status).color}`}>
                {getStatusLabel(artwork.status).text}
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => setSelectedArtwork(artwork)}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-art-blue hover:text-white transition-colors"
                  title="View details"
                >
                  <Expand className="w-5 h-5" />
                </button>
                <button 
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-art-blue hover:text-white transition-colors"
                  title="Add to favorites"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-art-blue text-lg font-semibold group-hover:text-art-blue-dark transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-art-muted text-sm">
                    {artwork.artist}, {artwork.year}
                  </p>
                </div>
                <span className="text-art-blue font-semibold text-lg">
                  {artwork.price}
                </span>
              </div>
              
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {artwork.description}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span>{artwork.medium}</span>
                <span>•</span>
                <span>{artwork.dimensions}</span>
              </div>

              <a
                href={`mailto:bastien@artforcollector.com?subject=Interest in "${artwork.title}" by ${artwork.artist}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-art-blue text-art-blue rounded-pill hover:bg-art-blue hover:text-white transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                {t('privateGallery.inquire')}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium mb-4 ${getStatusLabel(selectedArtwork.status).color}`}>
                  {getStatusLabel(selectedArtwork.status).text}
                </div>
                <h3 className="font-serif text-2xl text-art-blue mb-2">
                  {selectedArtwork.title}
                </h3>
                <p className="text-art-muted mb-4">
                  {selectedArtwork.artist}, {selectedArtwork.year}
                </p>
                <p className="text-2xl font-semibold text-art-blue mb-6">
                  {selectedArtwork.price}
                </p>
                <p className="text-gray-600 mb-6">
                  {selectedArtwork.description}
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-8">
                  <p><strong>Medium:</strong> {selectedArtwork.medium}</p>
                  <p><strong>Dimensions:</strong> {selectedArtwork.dimensions}</p>
                </div>
                <a
                  href={`mailto:bastien@artforcollector.com?subject=Interest in "${selectedArtwork.title}" by ${selectedArtwork.artist}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-art-blue text-white rounded-pill hover:bg-art-blue-dark transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  Contact about this artwork
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
