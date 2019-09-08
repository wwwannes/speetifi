import React, {Component} from 'react';

class FoundTracks extends Component{
  constructor(){
    super()
    this.state = {
      status: "open",
      audioObject: null
    }
  }

  closeWindow(){
    this.setState({status: "close"})

    setTimeout(
      function() {
          this.setState({status: ""})
          this.props.closeWindow()
      }
      .bind(this),
      1750
    );
  }

  playDemo(url){
    this.state.audioObject = new Audio(url);
    this.state.audioObject.play();
  }

  render(){
    console.log(this.props.results);
    return(
      <div className={`content ${this.state.status}`}>
        <span className="close-btn" onClick={() => this.closeWindow()}>CLOSE</span>
        <ol className="song-list">
          {this.props.results.map((song, key) =>
            <li className="song-list-item" key={key}>
              <div>
                {song.preview_url &&
                  <span onClick={() => this.playDemo(song.preview_url)}><i class="fas fa-volume-off"></i></span>
                }

                <a href={song.external_urls.spotify} target="_blank" className={!song.artists && "playlist"}>
                  {/* ONLY SHOW ARTISTS WHEN AVAILABLE */}
                  {song.artists &&
                    <span className="subtitle">{song.artists[0].name}</span>
                  }
                  <img src={song.images ? song.images[0].url : song.album.images[0].url} alt={song.name}/>
                  <span className="title" key={key}>{song.name}</span>
                </a>
              </div>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

export default FoundTracks;
