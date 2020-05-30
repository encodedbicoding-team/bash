import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './user.css'

class UserComponent extends Component {
  render() {
    return (
      <div className="user_main_container">
        <div>
          <div className="page_title">
            <p>Users</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserComponent);