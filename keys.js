console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bands = {
    id: process.env.Bands_ID
  };

  exports.omdb = {
    id: process.env.OMDB_ID
  };


/* 
.env file contents

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

Bands_ID=codingbootcamp

OMDB_ID=trilogy
*/