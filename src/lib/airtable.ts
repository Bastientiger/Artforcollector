import Airtable from 'airtable';
import type { Artwork } from '@/components/ArtworkGallery';

// Configuration Airtable via variables d'environnement
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID || '';
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN || '';

const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

// Convertir un enregistrement Airtable en objet Artwork
function recordToArtwork(record: any): Artwork {
  const attachments = record.fields.Image || [];
  const imageUrl = attachments.length > 0 ? attachments[0].url : '/images/placeholder.jpg';

  return {
    id: record.fields.ID || parseInt(record.id.replace(/\D/g, '').slice(0, 6)),
    title: record.fields.Title || 'Sans titre',
    artist: record.fields.Artist || 'Artiste inconnu',
    year: record.fields.Year?.toString() || '',
    medium: record.fields.Medium || '',
    dimensions: record.fields.Dimensions || '',
    price: record.fields.Price || 'Prix sur demande',
    image: imageUrl,
    description: record.fields.Description || '',
    status: (record.fields.Status?.toLowerCase() as 'available' | 'reserved' | 'sold') || 'available',
  };
}

// Récupérer uniquement les œuvres disponibles ou réservées (pour la galerie)
export async function getAvailableArtworks(): Promise<Artwork[]> {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    console.error('Airtable non configuré');
    return [];
  }

  try {
    const records = await base('Artworks')
      .select({
        view: 'Grid view',
        filterByFormula: 'OR(Status = "available", Status = "reserved")',
        sort: [{ field: 'ID', direction: 'asc' }],
      })
      .all();

    return records.map(recordToArtwork);
  } catch (error) {
    console.error('Erreur Airtable:', error);
    return [];
  }
}
