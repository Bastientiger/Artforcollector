import Airtable from 'airtable';
import type { Artwork } from '@/components/ArtworkGallery';

// Configuration Airtable via variables d'environnement
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID || '';
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN || '';

console.log('Airtable Config:', {
  baseId: AIRTABLE_BASE_ID ? 'Set' : 'NOT SET',
  token: AIRTABLE_TOKEN ? 'Set' : 'NOT SET'
});

const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

// Convertir un enregistrement Airtable en objet Artwork
function recordToArtwork(record: any): Artwork {
  console.log('Airtable record:', record.fields);
  
  // Récupérer TOUTES les images (pas seulement la première)
  const attachments = record.fields.Image || record.fields.image || [];
  const imageUrls = attachments.length > 0 
    ? attachments.map((att: any) => att.url) 
    : ['/images/placeholder.jpg'];

  return {
    id: record.fields.ID || record.fields.id || parseInt(record.id.replace(/\D/g, '').slice(0, 6)),
    title: record.fields.Title || record.fields.title || 'Untitled',
    artist: record.fields.Artist || record.fields.artist || 'Unknown Artist',
    year: (record.fields.Year || record.fields.year)?.toString() || '',
    medium: record.fields.Medium || record.fields.medium || '',
    dimensions: record.fields.Dimensions || record.fields.dimensions || '',
    price: record.fields.Price || record.fields.price || 'Price on request',
    images: imageUrls,  // ← Tableau de toutes les URLs
    description: record.fields.Description || record.fields.description || '',
    status: (record.fields.Status || record.fields.status || 'available').toLowerCase() as 'available' | 'reserved' | 'sold',
  };
}

// Récupérer uniquement les œuvres disponibles ou réservées (pour la galerie)
export async function getAvailableArtworks(): Promise<Artwork[]> {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    console.error('Airtable not configured - missing environment variables');
    return [];
  }

  try {
    console.log('Fetching artworks from Airtable...');
    
    const records = await base('Artworks')
      .select({
        view: 'Grid view',
        sort: [{ field: 'ID', direction: 'asc' }],
      })
      .all();

    console.log('Total records fetched:', records.length);
    
    const artworks = records.map(recordToArtwork);
    
    // Filtrer uniquement available et reserved
    const filtered = artworks.filter(a => a.status === 'available' || a.status === 'reserved');
    console.log('Filtered artworks (available/reserved):', filtered.length);
    
    return filtered;
  } catch (error) {
    console.error('Airtable error:', error);
    return [];
  }
}
