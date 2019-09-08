import React, {Component} from 'react';
import FoundTracks from "../FoundTracks";

class FeaturedPlaylists extends Component{
  constructor(){
    super();
    this.state = {
      featuredPlaylists: []
    }
  }

  componentDidMount(){
    this.props.api.getFeaturedPlaylists({limit: 10})
      .then(
        response => this.setState({featuredPlaylists: response.playlists.items}),
        error => console.log(error)
      )
  }

  render(){
    return(
      <>
        <FoundTracks
          results={this.state.featuredPlaylists}
          closeWindow={this.props.closeWindow}
          page="Featured playlists"
        />
      </>
    )
  }
}

export default FeaturedPlaylists;
