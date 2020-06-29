import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { PageNavigation } from '../../utils/pageNavigation';
import { UserMainDetails } from './subComponents';
import { DetailsInfo, LineGraph } from '../../utils/utils';
import './user.css'

class UserComponent extends Component {

    state = {
      current_search: '',
      lineGraphLabels: [],
      lineGraphSeries: [],
    }

  componentDidMount() {
    this.handleSetCurrentSearch()
    this.handleSetLineGraphData();
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
                  figure="59,364"
                  w="120px"
                />
              </div>
              <div>
                <DetailsInfo 
                  title="games played"
                  figure="1,939,364"
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
          <div className="user_details_section">
            <UserMainDetails/>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(UserComponent);