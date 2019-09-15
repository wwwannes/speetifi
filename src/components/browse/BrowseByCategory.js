import React, {Component} from 'react';
import FoundTracks from "../FoundTracks";

class BrowseByCategory extends Component{
  constructor(){
    super();
    this.state = {
      status: "open",
      activeContent: false,
      categories: [],
      categoryTracks: [],
      selectedCategory: ""
    }
  }

  componentDidMount(){
    this.props.api.getCategories({limit: 50})
      .then(
        response => this.setState({categories: this.shuffleArray(response.categories.items).slice(0, 10)}),
        error => console.log(error)
      )
  }

  shuffleArray(arr){
    return arr.map(a => [Math.random(), a])
              .sort((a, b) => a[0] - b[0])
              .map(a => a[1]);
  }

  closeWindow(){
    this.setState({status: "close"});

    setTimeout(
      function() {
          this.setState({status: ""});
          this.props.closeWindow();
      }
      .bind(this),
      1750
    );
  }

  getPlaylist(id){
    this.props.api.getCategoryPlaylists(id.toString(), {limit: 5})
      .then(
        response => this.props.api.getPlaylistTracks(response.playlists.items[Math.floor(Math.random()*4)].id)
          .then(
            tracks => {

              let results = this.shuffleArray(tracks.items).slice(0, 10);
              let resultArr = [];
              for(let i = 0; i < 10; i++){
                resultArr.push( results[i].track );
              }

              this.setState({categoryTracks: resultArr});
              this.setState({activeContent: true, selectedCategory:id});
            },
            errors => console.log(errors)
          ),
        error => console.log(error)
      )
  }

  render(){
    return(
        <>
          <div className={`content ${this.state.status}`}>
            <div className="close-btn" onClick={() => this.closeWindow()}>
              <span className="close-icon"></span>
              <span className="close-text">{this.props.page}</span>
            </div>
            <ol className="song-list">
              {this.state.categories.map((category, key) =>
                <li
                  className="song-list-item"
                  key={key}
                  onClick={this.getPlaylist.bind(this, category.id)}
                >
                  <div>
                    <div className="song-element playlist">
                      <span className="title">{category.name}</span>
                    </div>
                  </div>
                </li>
              )}
            </ol>
          </div>

          {this.state.categoryTracks.length > 0 &&
            <FoundTracks
              results={this.state.categoryTracks}
              closeWindow={this.props.closeWindow}
              page={this.state.selectedCategory}
              secondLevel="true"
            />
          }
      </>
    )
  }
}

export default BrowseByCategory;
