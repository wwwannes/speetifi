import React, {Component, useState} from 'react';
import FoundTracks from "./FoundTracks";

class SearchTracks extends Component {
  constructor(){
    super();
    this.state = {
      tracksFound: [],
      searchText: ""
    }
  }

  searchByTerm(query){
    /* searches tracks and playlists */
    if(query.length >= 3){
      this.props.api.search(query, ['track', 'playlist'], { limit: 50, offset: 1 })
        .then(
          response => {
            this.setState({searchText: query, tracksFound: response})
          },
          error => console.log('Something went wrong!', error)
        );
    } else {
      this.setState({searchText: query})
    }
  }

  render(){
    let foundTracks = "";
    if(this.state.tracksFound.length != 0){
      foundTracks = <FoundTracks foundTracks={this.state.tracksFound}/>
    }

    return(
      <div className="content">
        <div>
          <input type="text" value={this.state.searchText} onChange={(event) => this.searchByTerm(event.target.value)}/>
          {foundTracks}
        </div>
      </div>
    )
  }
}

export default SearchTracks;
