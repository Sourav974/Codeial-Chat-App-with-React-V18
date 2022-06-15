import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../actions/profile";
class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    console.log("this.props", params);
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading!</h1>;
    }

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons.flaticon.com/png/512/560/premium/560277.png?token=exp=1654650205~hmac=bf2049812275e03409356f1d2b28ef05"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}

export default connect(mapStateToProps)(UserProfile);
