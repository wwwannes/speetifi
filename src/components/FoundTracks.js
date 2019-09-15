import React, {Component} from 'react';

import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class FoundTracks extends Component{
  constructor(){
    super()
    this.state = {
      status: "open",
      mouseX: null,
      mouseY: null,
      hoverIndex: null,
      previewProgress: 0,
      audioLink: "",
      songIndex: null,
      updatePreview: null,
      reset: null
    }
  }

  mouseEnter(key){
    this.state.mouseX != null &&
      this.setState({hoverIndex: key});
  }
  mouseLeave(){
    // RESET ALL AUDIO LOGIC
    clearInterval(this.state.updatePreview);
    clearTimeout(this.state.reset);

    this.setState({hoverIndex: null, previewProgress: 0, audioLink: ""});
  }
  mouseMove(e) {
    this.setState({ mouseX: e.pageX - 300, mouseY: e.pageY - 300 });
  }

  closeWindow(){
    this.setState({audioLink: "", status: "close"});

    setTimeout(
      function() {
          this.setState({status: ""});

          // ONLY RESET THE WINDOW WHEN THERE IS NO SECOND LEVE OF RESULTS PRESENT
          !this.props.secondLevel &&
            this.props.closeWindow();
      }
      .bind(this),
      1750
    );
  }

  updatePreview(){
    const perSecond = 100 / 30; //100% - PREVIEWS ARE ALWAYS 30 SECONDS LONG
    this.setState({previewProgress: this.state.previewProgress + perSecond});
  }

  playDemo(url, index){

    clearInterval(this.state.updatePreview);
    clearTimeout(this.state.reset);

    if(this.state.updatePreview == null){
      this.myRef = React.createRef();
      this.setState({audioLink: url, songIndex: index, previewProgress: 0});

      const updatePreview = setInterval(this.updatePreview.bind(this), 1000);
      this.setState({updatePreview: updatePreview}) // MAKE INTERVAL AVAILABLE FOR RESET

      const reset = setTimeout(
        function() {
          this.setState({previewProgress: 0, updatePreview: null});
          clearInterval(updatePreview);
        }
        .bind(this),
        30000
      );
      this.setState({reset: reset}); // MAKE TIMEOUT AVAILABLE FOR RESET
    } else {
      this.setState({audioLink: "", songIndex: null, previewProgress: 0, updatePreview: null});
    }
  }

  render(){
    return(
      <div className={`content ${this.state.status}`}>
        <div className="close-btn" onClick={() => this.closeWindow()}>
          <span className="close-icon"></span>
          <span className="close-text">{this.props.page}</span>
        </div>
        <audio src={this.state.audioLink} ref={this.myRef} autoPlay/>
        <ol className="song-list">
          {this.props.results.map((song, key) =>
            <li
              className="song-list-item"
              key={key}
              onMouseEnter={() => this.mouseEnter(key)}
              onMouseMove={this.mouseMove.bind(this)}
              onMouseLeave={() => this.mouseLeave()}
            >
              <div>
                <div className={`song-element ${!song.artists ? "playlist" : ""}`}>
                  {/* ONLY SHOW ARTISTS WHEN AVAILABLE */}
                  {song.artists &&
                    <div className="subtitle">
                      {song.preview_url &&
                        <div
                          className={`play-btn ${this.state.updatePreview !== null & this.state.audioLink !== "" ? "playing" : ""}`}
                          onClick={() => this.playDemo(song.preview_url, key)}
                        >
                          <CircularProgressbar
                            value={this.state.songIndex === key ? this.state.previewProgress : 0}
                            styles={buildStyles({
                              pathColor: '#1DB954',
                              trailColor: 'white',
                              strokeLinecap: 'butt',
                              pathTransition:
                                this.state.previewProgress === 0 ? 'none' : 'stroke-dashoffset 0.5s ease 0s',
                            })}
                          />
                        </div>
                      }
                      {song.external_urls &&
                        <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={key}>{song.artists[0].name}</a>
                      }
                    </div>
                  }
                  {song.external_urls ?
                    <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="title" key={key}>{song.name}</a>
                  :
                    <span className="title" key={key}>{song.name}</span>
                  }
                </div>
              </div>
            </li>
          )}
        </ol>

        {this.props.results.length > 0 &&
          <div className="cover-container">
            {this.props.results.map((song, key) =>
              <>
                {(song.album || song.images) &&
                  <img
                    className={`cover ${this.state.hoverIndex === key ? "active" : ""}`}
                    src={song.images ? song.images[0].url : song.album.images[0].url}
                    alt={song.name}
                    style={{'top':this.state.mouseY, 'left':this.state.mouseX}}
                    key={key}
                  />
                }
              </>
            )}
          </div>
        }
      </div>
    )
  }
}

export default FoundTracks;
