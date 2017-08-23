import React from 'react';
import axios from 'axios';
import Songs from './Songs';
import AllAlbums from './AllAlbums';
import {Link} from 'react-router-dom';

export default class SingleAlbum extends React.Component {

  constructor(){
    super();
    this.state = {
      artist: {},
      artistAlbums: [],
      artistSongs: []
    }
  }

  componentDidMount () {

    const artistId = this.props.match.params.artistId;

    const getArtist = axios.get(`/api/artists/${artistId}`),
          getAlbums = axios.get(`/api/artists/${artistId}/albums`),
          getSongs = axios.get(`/api/artists/${artistId}/songs`);

    Promise.all([getArtist, getAlbums, getSongs])
    .then(([artist, artistAlbums, artistSongs]) => {

      // filters out albums with 0 songs
      let correctAlbums = artistAlbums.data.filter(function(album) {
        return album.songs.length > 0;
      });

      this.setState({
        artist: artist.data,
        artistAlbums: correctAlbums,
        artistSongs: artistSongs.data
      })
    })
      .then(() => console.log(this.state))
      .catch(console.error.bind(console));

  }

  render () {

      const artist = this.state.artist; // or however you've named it

      return (
        <div>
          <h3>{ artist.name }</h3>
          <ul className="nav nav-tabs">
            <li><Link to="TODO">ALBUMS</Link></li>
            <li><Link to="TODO">SONGS</Link></li>
          </ul>

          {/* Routes will go here! */}
        </div>
      );
    }

  }
