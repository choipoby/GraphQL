import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h3> {song.title}</h3>
        {song.id}
      </div>
    );
  }
}

// graphql always intercepts props and know what's in props
export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
