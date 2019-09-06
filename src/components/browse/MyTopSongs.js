import React, {Component} from 'react';

class MyTopSongs extends Component{
  constructor(){
    super();
    this.state = {
      songs: []
    }
  }

  componentDidMount(){
    this.props.api.getMyTopTracks({limit: 10})
      .then(
        response => {
          console.log(response);
          this.setState({songs: response.items})
        },
        error => console.log(error)
      );
  }

  render(){
    return(
      <div className="content">
        <ol className="song-list">
          {this.state.songs.map((song, key) =>
            <li className="song-list-item" key={key}>
              <div>
                <span className="title" key={key}>{song.name}</span><span className="subtitle">{song.artists[0].name}</span>
              </div>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

export default MyTopSongs;
