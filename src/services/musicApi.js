// src/services/musicApi.js
// Service for fetching music from Jamendo API (free, non-commercial use)
// Docs: https://developer.jamendo.com/v3.0


// Use EB Layer backend for all music API requests
const EB_LAYER_BASE = typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app')
  ? 'https://music-theta-three.vercel.app/api'
  : 'http://localhost:4000/api';

export async function fetchPlaylists() {
  // Jamendo doesn't have 'playlists' in the Spotify sense, so we use 'radios' or 'tags' as categories
  const res = await fetch(`${BASE_URL}/radios/?client_id=${JAMENDO_CLIENT_ID}&format=json`);
  const data = await res.json();
  return data.radios || [];
}

export async function fetchTracksByTag(tag = 'chillout', limit = 10) {
  // Fetch tracks by tag from EB Layer
  const res = await fetch(`${EB_LAYER_BASE}/tracks?tag=${encodeURIComponent(tag)}&limit=${limit}`);
  const data = await res.json();
  return data;
}

export async function fetchTrackById(id) {
  const res = await fetch(`${BASE_URL}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&id=${id}`);
  const data = await res.json();
  return data.results && data.results[0];
}
