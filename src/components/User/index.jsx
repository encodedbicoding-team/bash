import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { PageNavigation } from '../../utils/pageNavigation';
import './user.css'

class UserComponent extends Component {

    state = {
      current_search: ''
    }

  componentDidMount() {
    this.handleSetCurrentSearch()
  }
  handleSetCurrentSearch() {
    const search = this.props.location.search.split('=')[1];
    this.setState({ current_search: search || 'all'});
  }
  render() {
    return (
      <div className="user_main_container">
        <div>
          <div className="page_title">
            <p>Users</p>
          </div>
          <div>
            <PageNavigation
              current_search={this.state.current_search}
              date_func={(f) => console.log(f)}
            />
          </div>
          <div>
            dssds
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(UserComponent);