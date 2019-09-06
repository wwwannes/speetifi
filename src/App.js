/* https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/spotify-web-api.js */
import React, { Component } from 'react';
import './App.scss';

import Loggedin from "./pages/Loggedin"

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
      /* get a track by id */
      /*spotifyApi.getTrack("6oJ6le65B3SEqPwMRNXWjY")
        .then(function(data) {
          console.log('Some information about the authenticated user', data);
        }, function(err) {
          console.log('Something went wrong!', err);
        });*/

      /* get related artist */
      spotifyApi.getArtistRelatedArtists("0oSGxfWSnnOXhD2fKuz2Gy")
        .then(function(data) {
          console.log('Some information about the authenticated user', data);
        }, function(err) {
          console.log('Something went wrong!', err);
        });

      /* get playlists of logged in user */
      spotifyApi.getUserPlaylists()
        .then(function(data) {
          console.log('Some information about the authenticated user', data);
        }, function(err) {
          console.log('Something went wrong!', err);
        });

    /*spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url
            }
        });
      })*/
  }
  render() {
    return (
      <div className="App">
        {!this.state.loggedIn &&
          <a href='http://localhost:8888' > Login to Spotify </a>
        }
        {this.state.loggedIn &&
          <Loggedin api={spotifyApi}/>
        }
      </div>
    );
  }
}

export default App;
