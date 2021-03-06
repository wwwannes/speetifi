import React, {Component} from 'react';

import UserData from '../components/user/UserData';
import NowPlaying from '../components/user/NowPlaying';

import SearchTracks from '../components/SearchTracks';
import NewReleases from '../components/browse/NewReleases';
import BrowseByCategory from '../components/browse/BrowseByCategory';
import FeaturedPlaylists from '../components/browse/FeaturedPlaylists';
import Recommendations from '../components/browse/Recommendations';
import MyTopSongs from '../components/browse/MyTopSongs';
import RecentlyPlayed from '../components/browse/RecentlyPlayed';

class Loggedin extends Component{
  constructor(props){
    super(props);
    this.state = {
      navigation: [
        {title: "Tracks & playlists", component: "SearchTracks"},
        {title: "New releases", component: "NewReleases"},
        {title: "Recently Played", component: "RecentlyPlayed"},
        {title: "Featured playlists", component: "FeaturedPlaylists"},
        {title: "Recommendations",component: "Recommendations"},
        {title: "Browse by category", component: "BrowseByCategory"},
        {title: "Featured playlists", component: "FeaturedPlaylists"}
      ],
      activeContent: null
    }
  }

  toggleWindow(showComponent) {
    this.setState({activeContent: showComponent});
  }

  componentDidMount(){
    // LOG OUT AFTER 1 HOUR
    setTimeout(
      function() {
        window.history.pushState({},'',"./")
        window.location.reload();
      },
      600000
    );
  }

  render(){
    return(
      <>
        <UserData api={this.props.api}/>
        <div className="container">
          <div className="tabs">
            <ol className="tab-list">
              {this.state.navigation.map((item, key) =>
                <li className="title tab-list-item" onClick={() => this.toggleWindow(item.component)} key={key}>{item.title}</li>
              )}
            </ol>
            <div className="tab-content">
              {(() => {
                switch(this.state.activeContent) {
                  case 'SearchTracks':
                    return <SearchTracks api={this.props.api} closeWindow={this.toggleWindow.bind(this)}/>;
                  case 'MyTopSongs':
                    return <MyTopSongs api={this.props.api} closeWindow={this.toggleWindow.bind(this)}/>;
                  case 'Recommendations':
                    return <Recommendations api={this.props.api} closeWindow={this.toggleWindow.bind(this)}/>;
                    case 'FeaturedPlaylists':
                      return <FeaturedPlaylists api={this.props.api} closeWindow={this.toggleWindow.bind(this)}/>;
                    case 'BrowseByCategory':
                      return <BrowseByCategory api={this.props.api} closeWindow={this.toggleWindow.bind(this)}/>;
                    case 'NewReleases':
                      return <NewReleases api={this.props.api} closeWindow={this.toggleWindow.bind(this)}/>;
                      case 'RecentlyPlayed':
                        return <RecentlyPlayed api={this.props.api} closeWindow={this.toggleWindow.bind(this)}/>;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
        <NowPlaying api={this.props.api}/>
      </>
    )
  }
}

export default Loggedin;
