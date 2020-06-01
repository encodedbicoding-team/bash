import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import './userdetails.css';


class UserDetailsComponent extends Component {
  render() {
    return (
      <div className="user_details_component_containers">
        <div className="user_details_component_header">

          <Link to="/users" className="items_back_link">
            <div className="user_details_items_back">
              <div>
                <i class="lni lni-chevron-left"></i>
              </div>
              <div>
                <p>Back</p>
              </div>
            </div>
          </Link>
          <div className="user_details_items_blockuser">
            <div>
              <p>Block User</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserDetailsComponent)