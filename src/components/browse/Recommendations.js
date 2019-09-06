import React, {Component} from 'react';

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
      <div className="content">
        {this.state.recommendations.length > 0 ?
          this.state.recommendations.map((artist, key) =>
            <span key={key} style={{display:'block'}}><b>{artist.artists[0].name}</b>{artist.name}</span>
          )
          :
            <i>Loading</i>
        }
      </div>
    )
  }
}

export default Recommendations;
