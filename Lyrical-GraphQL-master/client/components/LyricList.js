import React, { Component } from "react";
import { graphql } from "react-apollo";
import likeLyric from "../queries/likeLyric";

class LyricList extends Component {
  // 어떻게 +1 이 되지?? 아무런 증가 로직이 없는데...
  onLike(id, likes) {
    console.log(id);
    this.props.mutate({
      variables: { id },
      // UI response를 빠르게 하기위한 로직.
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }
  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i
              className='material-icons'
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

export default graphql(likeLyric)(LyricList);
