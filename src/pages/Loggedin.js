import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Tabs from '../components/ui/Tabs';

import UserData from '../components/user/UserData';
import NowPlaying from '../components/user/NowPlaying';

import SearchTracks from '../components/SearchTracks';
import NewReleases from '../components/browse/NewReleases';
import BrowseByCategory from '../components/browse/BrowseByCategory';
import FeaturedPlaylists from '../components/browse/FeaturedPlaylists';
import Recommendations from '../components/browse/Recommendations';
import MyTopSongs from '../components/browse/MyTopSongs';

const Loggedin = (props) => {
  return(
    <>
      <UserData api={props.api}/>
      <div className="container">
        <Tabs>
          <div label="Search">
            <SearchTracks api={props.api}/>
          </div>
          <div label="MyTopSongs">
            <MyTopSongs api={props.api}/>
          </div>
          <div label="Recommendations">
            <Recommendations api={props.api}/>
          </div>
          <div label="Featured Playlists">
            <FeaturedPlaylists api={props.api}/>
          </div>
          <div label="Browse By Category">
            <BrowseByCategory api={props.api}/>
          </div>
          <div label="New Releases">
            <NewReleases api={props.api}/>
          </div>
        </Tabs>
      </div>
      <NowPlaying api={props.api}/>
    </>
  )
}

export default Loggedin;
