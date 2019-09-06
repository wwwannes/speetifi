import React, {Component} from 'react';

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
        response => {this.setState({newReleases: this.shuffleArray(response.albums.items)}); console.log(response)},
        error => console.log(error)
      )
  }

  render(){
    return(
      <div className="newReleases content">
        <h4>New releases</h4>
        <ul>
          {/* Only display the first 10 albums of the randomized array */}
          {this.state.newReleases.slice(0, 10).map((album, key) =>
            <li key={key}>
              <img src={album.images[1].url} alt={album.name} width={album.images[1].width}/>
              <span>{album.name}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default NewReleases;
