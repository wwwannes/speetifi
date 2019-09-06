import React from 'react';

const FoundTracks = (foundTracks) => {

  const tracks = foundTracks.foundTracks.tracks.items;
  const playlists = foundTracks.foundTracks.playlists.items;

  let selectedTracks = tracks.sort((a, b) => (a.name > b.name) ? 1 : -1).slice(0, 5);
  let selectedPlaylists = playlists.slice(0,5);

  const songs = selectedTracks.concat(selectedPlaylists);

  return(
    <>
      {songs.sort((a, b) => (a.name > b.name) ? 1 : -1).map((song, key) => (
        song.type == "track" ?
          <div key={key}>
            <h1>{song.name}</h1>
            <span>
              {song.artists.map((artist, key) =>
              song.artists.length > 1 ?
              key == song.artists.length - 1 ?
                artist.name :
                artist.name+", " :
              artist.name )}
            </span>
          </div>
        :
          <div key={key}>
            <h1>{song.name}</h1>
            <span>playlist by {song.owner.display_name}</span>
          </div>
      ))}
    </>
  )
}

export default FoundTracks;
