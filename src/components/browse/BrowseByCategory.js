import React, {Component} from 'react';

class BrowseByCategory extends Component{
  constructor(){
    super();
    this.state = {
      categories: [],
      categoryTracks: []
    }
  }

  componentDidMount(){
    this.props.api.getCategories({limit: 50})
      .then(
        response => this.setState({categories: response.categories.items}),
        error => console.log(error)
      )
  }

  getPlaylist(id){
    this.props.api.getCategoryPlaylists(id.toString(), {limit: 5})
      .then(
        response => this.props.api.getPlaylistTracks(response.playlists.items[Math.floor(Math.random()*4)].id)
          .then(
            tracks => this.setState({categoryTracks: tracks.items}),
            errors => console.log(errors)
          ),
        error => console.log(error)
      )
  }

  render(){
    return(
      <div className="categoriesContainer content">
        <h4>Categories</h4>
        <ul className="categories">
          {this.state.categories.sort((a, b) => (a.name > b.name) ? 1 : -1)
            .map((categorie, key) => (
            <li key={key} id={categorie.id} onClick={() => this.getPlaylist(categorie.id)}>{categorie.name}</li>
          ))}
        </ul>
        <ul className="categoriesResults">
          {this.state.categoryTracks.sort((a, b) => (a.track.name > b.track.name) ? 1 : -1)
            .slice(0, 10)
            .map((song, key) =>
            <li key={key}>
              <b>
                {/* check for the total of artists */}
                {/* Don't display the "," after the last artist */}
                {song.track.artists.map((artist, key) =>
                  song.track.artists.length > 1 ?
                  key == song.track.artists.length - 1 ?
                    artist.name :
                    artist.name+", " :
                  artist.name )}
              </b>
              &nbsp;-&nbsp;
              <span>{song.track.name}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }

}

export default BrowseByCategory;
