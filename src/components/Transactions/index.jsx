import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { PageNavigation } from '../../utils/pageNavigation';
import { DetailsInfo, PieGraph, LineGraph } from '../../utils/utils';
import './transactions.css';

class TransactionsComponent extends Component {
  state = {
    current_search: '',
    pieGraphLabels: [],
    pieGraphSeries: [],
    lineGraphLabels: [],
    lineGraphSeries: [],
  }
  componentDidMount() {
    this.handleSetCurrentSearch();
    this.handleSetPieGraphData();
    this.handleSetLineGraphData();
  }
  handleSetCurrentSearch() {
    const search = this.props.location.search.split('=')[1];
    if (search) {
      this.setState({ current_search: search.replace(/%20/g, ' ') || 'all'});
    } else {
      this.setState({ current_search: search || 'all'});
    }
  }
  handleSetPieGraphData () {
    const labels = ['Lily', 'Azalea', 'Alyssa', 'Jasmine', 'Cedar', 'Sage']
    const series = [20, 40, 12, 98, 100, 34]

    this.setState({ pieGraphLabels: labels, pieGraphSeries: series});
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
      <div className="transactions_main_container">
        <div>
          <div className="page_title_cont">
            <p className="page_title">Transactions</p>
            <div>
              <p>new transaction</p>
            </div>
          </div>
          <div>
            <PageNavigation
              page_details={[
                {
                  text: 'All',
                  url: '/transactions'
                },
                {
                  text: 'deposit',
                  url: '/transactions'
                },
                {
                  text: 'withdrawal',
                  url: '/transactions'
                },
                {
                  text: 'latest',
                  url: '/transactions'
                },

              ]}

              current_search={this.state.current_search}
              date_func={(f) => console.log(f)}
            />
          </div>
          <div className="flex flex-row m-top20">
              <div>
                <DetailsInfo
                  title="total"
                  figure="7"
                  width="120px"
                />
              </div>
              <div>
                <DetailsInfo
                  title="cancelled"
                  figure="61"
                  width="150px"
                />
              </div>
              <div>
              <DetailsInfo
                  title="pending"
                  figure="8"
                  width="120px"
                  border_right={false}
                />
              </div>
          </div>
          <div className="m-top20 page_chart_data">
              <div className="page_chart_graph">
                <div>
                  <LineGraph 
                   series={this.state.lineGraphSeries}
                  labels={this.state.lineGraphLabels}
                  />
                </div>
              </div>
              <div>
                <PieGraph
                  labels={this.state.pieGraphLabels}
                  series={this.state.pieGraphSeries}
                />
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TransactionsComponent);