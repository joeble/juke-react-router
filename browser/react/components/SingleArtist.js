import React from 'react';
import axios from 'axios';

export default class SingleAlbum extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedArtist: {}
    }
  }

  componentDidMount () {

  const artistId = this.props.match.params.artistId;

  axios.get(`/api/artists/${artistId}`)
    .then(res => res.data)
    .then(artist => this.setState({
      selectedArtist: artist
    }));
  }

  render(){

    const artist = this.state.selectedArtist;

    return (
      <div>
        <h3>ARTIST NAME</h3>
        <h4>ALBUMS</h4>
        <h4>SONGS</h4>
      </div>
    );
  }

}
