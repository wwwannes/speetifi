import React, {Component} from 'react';
import FoundTracks from "../FoundTracks";

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
          this.setState({songs: response.items})
        },
        error => console.log(error)
      );
  }

  render(){
    return(
      <>
        <FoundTracks
          results={this.state.songs}
          closeWindow={this.props.closeWindow}
        />
      </>
    )
  }
}

export default MyTopSongs;
