import React, {Component} from 'react';

class FoundTracks extends Component{
  constructor(){
    super()
    this.state = {
      status: "open",
      mouseX: 0,
      mouseY: 0,
      hoverIndex: null,
      audioObject: null,
      audioPlaying: false
    }
  }

  mouseEnter(key){
    this.setState({hoverIndex: key});
  }
  mouseLeave(){
    this.setState({hoverIndex: null});
  }
  mouseMove(e) {
    this.setState({ mouseX: e.screenX - 300, mouseY: e.screenY - 300 });
    console.log(this.index)
  }

  closeWindow(){
    if(this.state.audioPlaying){
      this.setState({audioObject: null})
    }

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
    if(!this.state.audioPlaying){
      this.setState({audioPlaying: true});
      this.state.audioObject = new Audio(url);
      this.state.audioObject.play();

      setTimeout(
        function() {
            this.setState({audioPlaying: false});
        }
        .bind(this),
        30000
      );
    }
  }

  render(){
    return(
      <div className={`content ${this.state.status}`}>
        <span className="close-btn" onClick={() => this.closeWindow()}>CLOSE {this.props.page}</span>
        <ol className="song-list">
          {this.props.results.map((song, key) =>
            <li className="song-list-item" key={key} onMouseEnter={() => this.mouseEnter(key)} onMouseMove={this.mouseMove.bind(this)} onMouseLeave={() => this.mouseLeave()}>
              <div>
                <div className={`song-element ${!song.artists ? "playlist" : ""}`}>
                  {/* ONLY SHOW ARTISTS WHEN AVAILABLE */}
                  {song.artists &&
                    <div className="subtitle">
                      {song.preview_url &&
                        <div className="play-btn" onClick={() => this.playDemo(song.preview_url)}><span></span></div>
                      }
                      <a href={song.external_urls.spotify} target="_blank">{song.artists[0].name}</a>
                    </div>
                  }
                  <span className="title" key={key}>{song.name}</span>
                </div>
              </div>
            </li>
          )}
        </ol>

        <div className="cover-container">
          {this.props.results.map((song, key) =>
            <img className={`cover ${this.state.hoverIndex == key && "active"}`} src={song.images ? song.images[0].url : song.album.images[0].url} alt={song.name} style={{'top':this.state.mouseY, 'left':this.state.mouseX}} key={key}/>
          )}
        </div>

      </div>
    )
  }
}

export default FoundTracks;
