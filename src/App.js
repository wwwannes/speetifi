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

  render() {
    return (
      <div className="App">
        <div className="container">
          {!this.state.loggedIn &&
            <div className='login'>
              <h1>Speetifi</h1>
              <a href='http://localhost:8888/login'> Login to Spotify </a>
            </div>
          }
        </div>
        {this.state.loggedIn &&
          <Loggedin api={spotifyApi}/>
        }
      </div>
    );
  }
}

export default App;
