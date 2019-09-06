import React, {Component} from 'react';

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
      <div className="content">
        <h4>Featured</h4>
        <ul>
          {this.state.featuredPlaylists.map((playlist, key) =>
            <li key={key}>
              <img src={playlist.images[0].url} alt={playlist.name} width={playlist.images[0].width}/>
              <span key={key}>{playlist.name}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default FeaturedPlaylists;
