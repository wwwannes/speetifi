import React, {Component} from 'react';
import FoundTracks from "../FoundTracks";

class RecentlyPlayed extends Component{
  constructor(){
    super();
    this.state = {
      songs: []
    }
  }

  componentDidMount(){
    this.props.api.getMyRecentlyPlayedTracks({limit: 10})
      .then(
        response => {
          let songArray = [];
          for(var item of response.items){
            console.log(item.track)
            songArray.push(item.track)
          }
          this.setState({songs: songArray})
        },
        error => console.log("error")
      )
  }

  render(){
    return(
      <>
        <FoundTracks
          results={this.state.songs}
          closeWindow={this.props.closeWindow}
          api={this.props.api}
          page="Recently played"
        />
      </>
    )
  }
}

export default RecentlyPlayed;
