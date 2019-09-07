import React, {Component} from 'react';
import FoundTracks from "../FoundTracks";

class NewReleases extends Component{
  constructor(){
    super();
    this.state = {
      newReleases: []
    }
  }

  shuffleArray(arr){
    return arr.map(a => [Math.random(), a])
              .sort((a, b) => a[0] - b[0])
              .map(a => a[1]);
  }

  componentDidMount(){
    this.props.api.getNewReleases({limit:50})
      .then(
        response => {this.setState({newReleases: this.shuffleArray(response.albums.items).slice(0,10)}); console.log(response)},
        error => console.log(error)
      )
  }

  render(){
    return(
      <>
        <FoundTracks
          results={this.state.newReleases}
          closeWindow={this.props.closeWindow}
        />
      </>
    )
  }
}

export default NewReleases;
