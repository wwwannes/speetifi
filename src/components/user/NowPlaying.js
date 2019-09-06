import React, {Component} from 'react';

class NowPlaying extends Component{
  constructor(){
    super();
    this.state = {
      nowPlaying: {
        name: "",
        artist: []
      }
    }
  }

  currentSong(component, api){
    api.getMyCurrentPlaybackState()
      .then((response) => {
        if(response){
          component.setState({
            nowPlaying: {
                name: response.item.name,
                artist: response.item.artists
              }
          });
        }
    })
  }

  componentDidMount(){
    setInterval(
      this.currentSong
      , 1000
      , this
      , this.props.api
    );
  }

  render(){
    return(
      <>

          {this.state.nowPlaying.name ?
            <div className="nowPlaying">
              <h4>Now playing:</h4>
              <i>
                {this.state.nowPlaying.name} -
                {this.state.nowPlaying.artist.map((artist, key) =>
                  <span key={key}>{artist.name} & </span>
                )}
              </i>
            </div>
          :
            <div></div>
          }
      </>
    )
  }
}

export default NowPlaying;
