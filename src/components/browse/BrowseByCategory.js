import React, {Component} from 'react';
import FoundTracks from "../FoundTracks";

class BrowseByCategory extends Component{
  constructor(){
    super();
    this.state = {
      status: "open",
      activeContent: false,
      categories: [],
      categoryTracks: []
    }
  }

  componentDidMount(){
    this.props.api.getCategories({limit: 50})
      .then(
        response => this.setState({categories: this.shuffleArray(response.categories.items)}),
        error => console.log(error)
      )
  }

  shuffleArray(arr){
    return arr.map(a => [Math.random(), a])
              .sort((a, b) => a[0] - b[0])
              .map(a => a[1]);
  }

  getPlaylist(id){
    this.props.api.getCategoryPlaylists(id.toString(), {limit: 5})
      .then(
        response => this.props.api.getPlaylistTracks(response.playlists.items[Math.floor(Math.random()*4)].id)
          .then(
            tracks => {
              this.setState({categoryTracks: this.shuffleArray(tracks.items).slice(0, 10)});
              this.setState({activeContent: true});
              console.log(this.state)
            },
            errors => console.log(errors)
          ),
        error => console.log(error)
      )
  }

  closeWindow(){
    this.setState({status: "close"})

    setTimeout(
      function() {
          this.setState({status: ""})
          this.props.closeWindow()
      }
      .bind(this),
      1750
    );
  }

  render(){
    return(
      <div className={`content ${this.state.status}`}>
        <span className="close-btn" onClick={() => this.closeWindow()}>CLOSE</span>
        <ol className="song-list">
          {this.state.categories.slice(0, 10)
            .map((categorie, key) => (
            <li className="song-list-item" key={key} id={categorie.id} onClick={() => this.getPlaylist(categorie.id)}>{categorie.name}</li>
          ))}
        </ol>

        {this.state.activeContent &&
          <FoundTracks
              results={this.state.categoryTracks}
              closeWindow={this.props.closeWindow}
          />
        }
        {/*<ul className="categoriesResults">
          {this.state.categoryTracks.sort((a, b) => (a.track.name > b.track.name) ? 1 : -1)
            .slice(0, 10)
            .map((song, key) =>
            <li key={key}>
              <b>*/}
                {/* check for the total of artists */}
                {/* Don't display the "," after the last artist */}
              {/*  {song.track.artists.map((artist, key) =>
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
        </ul>*/}
      </div>
    )
  }

}

export default BrowseByCategory;
