import React, {Component} from 'react';

class FoundTracks extends Component{
  constructor(){
    super()
    this.state = {
      status: "open"
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

  render(){
    console.log(this.props.results);
    return(
      <div className={`content ${this.state.status}`}>
        <span className="close-btn" onClick={() => this.closeWindow()}>CLOSE</span>
        <ol className="song-list">
          {this.props.results.map((song, key) =>
            <li className="song-list-item" key={key}>
              <div>
                <span className="title" key={key}>{song.name}</span>
                {/* ONLY SHOW ARTISTS WHEN AVAILABLE */}
                {song.artists &&
                  <span className="subtitle">{song.artists[0].name}</span>
                }
              </div>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

export default FoundTracks;
