
import React, { useEffect, useState, useRef } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import StarBorder from '../components/StarBorder';
import { useNavigate } from 'react-router-dom';
import { fetchTracksByTag } from '../services/musicApi';


const Playlist = ({ showBar, setShowBar }) => {
  const navigate = useNavigate();
  const { tag } = useParams();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCurrentPlaylist, play, currentTrack, isPlaying, pause } = usePlayer();
  useEffect(() => {
    setLoading(true);
    setError(null);
    const playlistTag = tag || 'chillout';
    fetchTracksByTag(playlistTag, 10)
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          setError('No tracks found. The music API may be unavailable or quota exceeded.');
          setTracks([]);
        } else {
          data.forEach((track, i) => console.log('Jamendo track', i, track));
          setTracks(data);
          // Always set playlist when tag changes (refresh music bar)
          if (setCurrentPlaylist) {
            const playlistArr = data.map(track => ({
              id: track.id,
              title: track.name,
              artist: track.artist_name,
              url: track.audio || track.audiodownload || track.shareurl,
              duration: track.duration
            }));
            setCurrentPlaylist(playlistArr);
            // If music bar is playing, auto-play the first track of the new playlist
            if (isPlaying && playlistArr.length > 0 && play) {
              play(playlistArr[0]);
            }
          }
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load music list. Please check your internet connection or try again later.');
        setTracks([]);
        setLoading(false);
        console.error('Jamendo API error:', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);
  return (
    <div className="bg-premium-gradient text-premium-cream min-h-screen">
      <div className="flex flex-row gap-3 mb-6 items-center w-full fixed top-4 right-4 z-50 justify-end">
        <StarBorder as="button" onClick={() => navigate('/')} color="#ffe066" className="w-28 py-2">Home</StarBorder>
        <StarBorder as="button" onClick={() => navigate(-1)} color="#ffe066" className="w-28 py-2">Back</StarBorder>
        <StarBorder as="button" onClick={() => setShowBar(v => !v)} color="#ffe066" className="w-28 py-2">{showBar ? 'Hide' : 'Show'}</StarBorder>
      </div>
      <main className="max-w-2xl mx-auto px-4 py-8 bg-premium-navy rounded-premium shadow-premium-card" style={{marginTop: '64px'}}>
        <div className="text-3xl font-serif mb-2 text-premium-gold drop-shadow-lg text-center">{tag ? tag.charAt(0).toUpperCase() + tag.slice(1) + ' Playlist' : 'Playlist'}</div>
        <h3 className="text-xl font-semibold mb-2 text-premium-gold">Tracks</h3>
        {loading ? (
          <div className="text-gold-300">Loading...</div>
        ) : error ? (
          <div className="text-red-400 font-semibold">{error}</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-premium shadow-premium-card bg-premium-gray/90 border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-premium-gold font-bold bg-premium-navy rounded-tl-premium">#</th>
                <th className="px-4 py-2 text-left text-premium-gold font-bold bg-premium-navy">Title</th>
                <th className="px-4 py-2 text-left text-premium-gold font-bold bg-premium-navy">Artist</th>
                <th className="px-4 py-2 text-left text-premium-gold font-bold bg-premium-navy">Duration</th>
                <th className="px-4 py-2 text-left text-premium-gold font-bold bg-premium-navy">Play</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, idx) => {
                // Try audio, then audiodownload, then shareurl
                const audioUrl = track.audio || track.audiodownload || track.shareurl;
                const isCurrent = currentTrack && currentTrack.id === track.id;
                return (
                  <tr key={track.id} className="group hover:scale-[1.015] hover:shadow-premium-card transition-transform duration-200 bg-premium-black/80 hover:bg-premium-navy/80 rounded-premium">
                    <td className="px-4 py-3 font-mono text-premium-gold rounded-l-premium group-hover:bg-premium-gold/10 transition">{idx + 1}</td>
                    <td className="px-4 py-3 text-premium-cream">{track.name}</td>
                    <td className="px-4 py-3 text-premium-cream">{track.artist_name}</td>
                    <td className="px-4 py-3 text-premium-cream">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</td>
                    <td className="px-4 py-3 flex gap-2 items-center">
                      {audioUrl ? (
                        <button
                          className={`px-3 py-1 rounded-full font-bold text-premium-black ${isCurrent && isPlaying ? 'bg-red-400' : 'bg-premium-gold hover:bg-premium-gold-dark'} transition`}
                          onClick={() => {
                            if (isCurrent && isPlaying) {
                              pause();
                            } else {
                              play({
                                id: track.id,
                                title: track.name,
                                artist: track.artist_name,
                                url: audioUrl,
                                duration: track.duration
                              });
                            }
                          }}
                        >
                          {isCurrent && isPlaying ? 'Pause' : 'Play'}
                        </button>
                      ) : (
                        <span className="text-premium-gold">No audio URL</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Playlist;
