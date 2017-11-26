import React, { Component } from 'react';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerID: "1113668123", // my query
      playlistID: "4SXIBoDpqej5UhVgxnoaWU",
      playlistTracks: null  // my response.
    }
  }

  search() {
    console.log('this.state', this.state);
    const FETCH_URL = 'https://api.spotify.com/v1/users/' + this.state.ownerID + '/playlists/' + this.state.playlistID + '/tracks';
    var accessToken = 'BQCQMlKnC2A2R6HPnH8jGvknaAEtu0sPdQdibWPlwhvOdUhdmgQRwx1_pIbBz-cIwKIxKOiOEe8gfvMiak0YEA6CgK2sgQbXlTJdPlxDwb4xPFReUioo3sRh6Z_5DsYSCkihH9-DPFhov9A'

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const playlistTracks = [];
        for (var i in json.items) {
          playlistTracks.push(json.items[i]);
        }
        console.log(playlistTracks);

        this.setState({ playlistTracks });
      })

  }

  render() {

    let playlistTracks = {
      0: {
        track: {
          name: '',
        }
      },
      1: {
        track: {
          name: '',
        }
      }


    };
    if (this.state.playlistTracks !== null) {
      playlistTracks = this.state.playlistTracks;
    }

    return (
      // return JSX 
      <div className="container">
        <hr />
        <div className="col-lg-6">
          <div className="input-group">
            <input type="text"
              onChange={event => { this.setState({ ownerID: event.target.value }) }}
              className="form-control" placeholder="ownerid" />
            <input type="text"
              onChange={event => { this.setState({ playlistID: event.target.value }) }}
              className="form-control" placeholder="playlistid" />
            <span className="input-group-btn">
              <button
                onClick={() => this.search()}
                className="btn btn-default" type="button">Search</button>
            </span>
          </div>
        </div>
        <hr />
        <div>
          <div> {playlistTracks[0].track.name} </div>
          <div> {playlistTracks[1].track.name} </div>

        </div>


      </div>
    )
  }
}
export default App;
