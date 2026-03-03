import { Mail, Heart, Expand, ChevronLeft, ChevronRight } from 'lucide-react';
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
  images: string[];  // ← Changé de "image" à "images" (tableau)
  description: string;
  status?: 'available' | 'reserved' | 'sold';
}

interface ArtworkGalleryProps {
  artworks: Artwork[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

// Composant Carrousel d'images
function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No image</span>
      </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full group/carousel">
      {/* Image principale */}
      <img
        src={images[currentIndex]}
        alt={`${alt} - Photo ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Flèches de navigation (visibles au hover) */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-art-blue" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-art-blue" />
          </button>

          {/* Indicateurs de position (points) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Compteur d'images */}
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
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

  // Filtrer les œuvres
  const filteredArtworks = filter === 'all' 
    ? artworks 
    : artworks.filter(a => a.status === filter);

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
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-art-blue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('privateGallery.filter.all')}
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
              filter === 'available' 
                ? 'bg-art-blue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('privateGallery.filter.available')}
          </button>
          <button
            onClick={() => setFilter('reserved')}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
              filter === 'reserved' 
                ? 'bg-art-blue text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('privateGallery.filter.reserved')}
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-art-muted">No artworks found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div
              key={`${filter}-${artwork.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
            >
              {/* Image Container avec Carrousel */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <ImageCarousel images={artwork.images} alt={artwork.title} />
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusLabel(artwork.status).color} z-10`}>
                  {getStatusLabel(artwork.status).text}
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10">
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
            </div>
          ))}
        </div>
      )}

      {/* Modal avec Carrousel */}
      {selectedArtwork && (
        <ModalWithCarousel 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
          getStatusLabel={getStatusLabel}
        />
      )}
    </div>
  );
}

// Modal avec carrousel d'images
function ModalWithCarousel({ 
  artwork, 
  onClose, 
  getStatusLabel 
}: { 
  artwork: Artwork; 
  onClose: () => void;
  getStatusLabel: (status?: string) => { text: string; color: string };
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? artwork.images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const images = artwork.images.length > 0 ? artwork.images : ['/images/placeholder.jpg'];

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Carrousel dans la modal */}
          <div className="relative aspect-square md:aspect-auto bg-gray-100">
            <img
              src={images[currentIndex]}
              alt={`${artwork.title} - Photo ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation dans la modal */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-art-blue" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-art-blue" />
                </button>
                
                {/* Indicateurs */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Compteur */}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
          
          <div className="p-8">
            <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium mb-4 ${getStatusLabel(artwork.status).color}`}>
              {getStatusLabel(artwork.status).text}
            </div>
            <h3 className="font-serif text-2xl text-art-blue mb-2">
              {artwork.title}
            </h3>
            <p className="text-art-muted mb-4">
              {artwork.artist}, {artwork.year}
            </p>
            <p className="text-2xl font-semibold text-art-blue mb-6">
              {artwork.price}
            </p>
            <p className="text-gray-600 mb-6">
              {artwork.description}
            </p>
            <div className="space-y-2 text-sm text-gray-500 mb-8">
              <p><strong>Medium:</strong> {artwork.medium}</p>
              <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
            </div>
            <a
              href={`mailto:bastien@artforcollector.com?subject=Interest in "${artwork.title}" by ${artwork.artist}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-art-blue text-white rounded-pill hover:bg-art-blue-dark transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              Contact about this artwork
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
