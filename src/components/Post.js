import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Comment } from "./";
import { createComment, addLike } from "../actions/posts";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
    };
  }
  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;

    if (e.key === "Enter") {
      this.props.dispatch(createComment(comment, post._id));

      // clear comment
      this.setState({
        comment: "",
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handlePostLike = () => {
    const { post, user } = this.props;
    this.props.dispatch(addLike(post._id, "Post", user._id));
  };

  render() {
    const { post, user } = this.props;
    const { comment } = this.state;

    const isPostKikedByUser = post.likes.includes(user._id);

    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="user-pic"
              />
            </Link>
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">a minute ago</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostKikedByUser ? (
                <img
                  src="https://cdn-icons.flaticon.com/png/512/2589/premium/2589175.png?token=exp=1655343740~hmac=98295f681dfafb17d5d0dafb80c35570"
                  alt="like post"
                />
              ) : (
                <img
                  src="https://cdn-icons.flaticon.com/png/512/2589/premium/2589197.png?token=exp=1655343787~hmac=7385607f6ef5d87788c7b935fd5f912e"
                  alt="likes-icon"
                />
              )}

              <span>{post.likes.length}</span>
            </button>

            <div className="post-comments-icon">
              <img
                src="https://cdn-icons.flaticon.com/png/512/3601/premium/3601571.png?token=exp=1655338429~hmac=7eb1367e3d53abd241a5d4bf8d4b69fa"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment"
              onChange={this.handleOnCommentChange}
              onKeyPress={this.handleAddComment}
              value={comment}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} postId={post._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Post);
