import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import numeral from 'numeral';
import { PageNavigation } from '../../utils/pageNavigation';
import { UserMainDetails } from './subComponents';
import { DetailsInfo, LineGraph } from '../../utils/utils';
import { getAllUsers, getUsersByCategory } from '../../features/httpRequests/getRequests';
import './user.css'

class UserComponent extends Component {

    state = {
      current_search: '',
      lineGraphLabels: [],
      lineGraphSeries: [],
      users_data: [],
      total_users: 0,
      games_played: 0,
      retries: 1,
    }

  componentDidMount() {
    this.handleRouteMatch()
    this.handleSetCurrentSearch()
    this.handleSetLineGraphData();
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.props.requestAllNewUsers === true) {
      if (this.state.retries !== 0) {
        this.setState({
          retries: this.state.retries - 1,
        })
        this.props.getUsersByCategory(this.state.allNewUsersFailedData);
      }
    }
  }
  handleFormatNumber(num, type) {
    num = num.toString();
    if (type !== 'money') {
      if (num.length < 3) {
        num = numeral(parseInt(num, 10))
        return num.value()
      } else {
        num = numeral(parseInt(num, 10))
        return num.format('0.0a')
      }
    } else {
      num = numeral(parseInt(num, 10))
      return num.format('0,0')
    }
 
  }
  async handleRouteMatch() {
    const search = this.props.location.search.split('=')[1];
    try {
      if (!search || search === 'all') {
        let results = JSON.parse(sessionStorage.getItem('<3_EBC__updated__users_dash_data<3_EBC'));
        if (results.users) {
          const users_data = this.handleFormatUsersData(results.users);
          this.setState({
            users_data,
            total_users: results.total_count,
            games_played: results.games_played
          })
        }
        let resultForAllUsers = await this.props.getAllUsers();
        sessionStorage.setItem('<3_EBC__updated__users_dash_data<3_EBC', JSON.stringify(resultForAllUsers.results.data));
        this.setState({
          users_data: this.handleFormatUsersData(resultForAllUsers.results.data.users),
          total_users: resultForAllUsers.results.data.total_count,
          games_played: resultForAllUsers.results.data.games_played
        })
      } else {
        let results = JSON.parse(sessionStorage.getItem('<3_EBC__updated__users_dash_data<3_EBC'));
        if (results) {
          this.setState({
            total_users: results.total_count,
            games_played: results.games_played
          })
        }
        let resultForAllUsers = await this.props.getAllUsers();
        sessionStorage.setItem('<3_EBC__updated__users_dash_data<3_EBC', JSON.stringify(resultForAllUsers.results.data));
        let resultForAllNewUsers = await this.props.getUsersByCategory(search);
        this.setState({
          users_data: this.handleFormatUsersDataCategory(resultForAllNewUsers.results.data.users),
          total_users: resultForAllNewUsers.results.data.total_count,
          games_played: resultForAllNewUsers.results.data.games_played
        })
      }
    }catch(err) {
      console.log(err);
    }
  }

  handleFormatUsersData(users_array) {
    let users_data = [];
    users_array.forEach((user) => {
      let obj = {};
      obj['id'] = user.id;
      obj['img_url'] = user.photo_url;
      obj['phone'] = user.phone_number;
      obj['email'] = user.email;
      obj['username'] = user.username;
      obj['status'] = user.is_verified ? 'verified' : 'unverified';
      obj['fullname'] = `${!user.first_name ? 'john' : user.first_name} ${!user.last_name ? 'doe' : user.last_name}`;

      users_data.push(obj);
    }) 
    return users_data;
  }
  handleFormatUsersDataCategory(users_array) {
    let users_data = [];
    users_array.forEach((user) => {
      let obj = {};
      obj['id'] = user.user.id;
      obj['img_url'] = user.user.photo_url;
      obj['phone'] = user.user.phone_number;
      obj['email'] = user.user.email;
      obj['username'] = user.user.username;
      obj['status'] = user.user.is_verified ? 'verified' : 'unverified';
      obj['fullname'] = `${!user.user.first_name ? 'john' : user.user.first_name} ${!user.user.last_name ? 'doe' : user.user.last_name}`;

      users_data.push(obj);
    }) 
    return users_data;
  }
  handleSetCurrentSearch() {
    const search = this.props.location.search.split('=')[1];
    this.setState({ current_search: search || 'all'});
  }
  handleSetLineGraphData () {
    const labels = ['Lily', 'Azalea', 'Alyssa', 'Jasmine', 'Cedar', 'Sage']
    const series = [{
      data: [20, 40, 12, 98, 100, 34]
    }]

    this.setState({ lineGraphLabels: labels, lineGraphSeries: series});
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
          <div className="flex flex-row u_d_place">
              <div>
                <DetailsInfo 
                  title="total"
                  figure={this.handleFormatNumber(this.state.total_users)}
                  w="120px"
                />
              </div>
              <div>
                <DetailsInfo 
                  title="games played"
                  figure={this.handleFormatNumber(this.state.games_played)}
                  w="120px"
                  border_right={false}
                />
              </div>
          </div>
          <div>
            <div className="user_line_graph">
              <LineGraph 
                series={this.state.lineGraphSeries}
                labels={this.state.lineGraphLabels}
              />
            </div>
          </div>
          {
            this.props.requestAllNewUsers === true ?
            <div>
              <p>Loading...</p>
            </div>
            :
            this.state.users_data.length <= 0  && !this.props.requestAllNewUsers?
            <div>
              {
                this.state.current_search === 'new' ?
                <div>
                  <p>No New users</p>
                </div>
                :
                this.state.current_search === 'active' ?
                <div>
                  <p>No Active users</p>
                </div>
                :
                <div>
                  <p>No users found</p>
                </div>
              }
            </div>
            :
            <div className="user_details_section">
            <UserMainDetails 
              user_details_array = {this.state.users_data}
            />
          </div>
          }
        </div>
      </div>
    )
  }
}

const actions = {
  getAllUsers,
  getUsersByCategory
}

const mapStateToProps = state => ({
  requestAllUsersData: state.httpGetRequests.requestingAllUsersData,
  requestAllNewUsers: state.httpGetRequests.requestingAllNewUsers,
  allNewUsersFailedData: state.httpGetRequests.allNewUsersFailedData
})


export default connect(mapStateToProps, actions)(withRouter(UserComponent));