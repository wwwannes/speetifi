import React, {Component} from 'react';
import FoundTracks from "../FoundTracks";

class Recommendations extends Component{
  constructor(){
    super();
    this.state = {
      recommendations: []
    }
  }

  componentDidMount(){

    const artistIds = [];

    this.props.api.getMyTopArtists({limit: 5})
      .then(
        response => {
          response.items.map((artist) => (
            artistIds.push(artist.id)
          ));
          this.props.api.getRecommendations({seed_artists: artistIds, min_popularity: 60, limit:10})
            .then(
              response => this.setState({recommendations:response.tracks}),
              error => console.log(error)
            )
        },
        error => console.log(error)
      );
  }

  render(){
    return(
      <>
        <FoundTracks
          results={this.state.recommendations}
          closeWindow={this.props.closeWindow}
          page="Recommendations"
        />
      </>
    )
  }
}

export default Recommendations;
