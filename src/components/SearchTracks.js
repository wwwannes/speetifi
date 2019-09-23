import React, {Component} from 'react';
import FoundTracks from "./FoundTracks";

class SearchTracks extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: "open",
      tracksFound: [],
      timeout: null,
      searchText: "Search",
      fontSize: 22,
      inputHeight: 0
    }
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

  searchByTerm(e){
    const query = e.target.textContent;
    //this.setState({searchText: query});
    clearTimeout(this.state.timeout);

    // RESIZE THE SEARCH TERM BASED ON ITS LENGTH
    if(this.search.clientHeight > this.state.inputHeight && this.state.fontSize > 2){
      this.setState({fontSize: this.state.fontSize - 3.5, inputHeight: this.search.clientHeight})
    }
    this.setState({inputHeight: this.search.clientHeight})

    // ONLY DO SEARCH WHEN USER STOPS TYPING
    const timeout = setTimeout(function () {

      // SEARCHES TRACKS AND PLAYLISTS
      if(query !== "" && query !== "Search"){
        this.props.api.search(query, ['track', 'playlist'], { limit: 50, offset: 1 })
          .then(
            response => {

              const tracks = this.shuffleArray(response.tracks.items).slice(0, 5) // GET 5 RANDOM TRACKS
              const playlists = this.shuffleArray(response.playlists.items).slice(0, 5) // GET 5 RANDOM PLAYLISTS
              const combined = this.shuffleArray(tracks.concat(playlists)) // RANDOMIZE THE RESULTS

              this.setState({tracksFound: this.shuffleArray(combined)})
            },
            error => console.log('Something went wrong!', error)
          );
      }
    }.bind(this), 500);

    this.setState({timeout: timeout});
  }

  componentDidMount() {
    this.setState({inputHeight: this.search.clientHeight}) // INITIALISE HEIGHT OF "INPUT" FIELD
    this.search.addEventListener("input", this.searchByTerm.bind(this));
  }

  render(){
    return(
      <>
        <div className={`content search ${this.state.status}`}>
          <div className="close-btn" onClick={() => this.closeWindow()}>
            <span className="close-icon"></span>
            <span className="close-text">Search results and playlists</span>
          </div>
          <div
            ref={elem => this.search = elem}
            className="search-field"
            contentEditable
            suppressContentEditableWarning={true}
            onChange={this.searchByTerm.bind(this)}
            style={{ "fontSize": `${this.state.fontSize}vw` }}
          >{this.state.searchText}</div>
        </div>
        {this.state.tracksFound.length > 0 &&
          <>
            <FoundTracks
              results={this.state.tracksFound}
              closeWindow={this.props.closeWindow}
              api={this.props.api}
              page="Tracks & playlist"
              secondLevel="true"
            />
          </>
        }
      </>
    )
  }
}

export default SearchTracks;
