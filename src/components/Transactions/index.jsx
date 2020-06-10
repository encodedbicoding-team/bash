import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { PageNavigation } from '../../utils/pageNavigation';
import { DetailsInfo, PieGraph, LineGraph } from '../../utils/utils';
import { TransMainDetail } from './subComponents';
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
          <div className="m-top20 all-trans-container">
              <div className="all-trans-grid all-trans-header">
                <div className="flex flex-col flex-center">
                  <p className="upper font-small c-1 font-bold">name</p>
                </div>
                <div className="flex flex-col flex-center">
                  <p className="upper font-small c-1 font-bold">transaction type</p>
                </div>
                <div className="flex flex-col flex-center"> 
                  <p className="upper font-small c-1 font-bold">amount</p>
                </div>
                <div className="flex flex-col flex-center">
                  <p className="upper font-small c-1 font-bold">date</p>
                </div>
                <div className="op-0">print-view</div>
              </div>
              <div className="all-tran-main-body">
                  {
                    dummy_all_transaction.map((trans, idx) => 
                    <TransMainDetail
                      key={idx}
                      image_url={trans.image_url}
                      first_name={trans.first_name}
                      last_name={trans.last_name}
                      type={trans.type}
                      amt={trans.amt}
                      date={trans.date}
                    />
                    )
                  }
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const dummy_all_transaction = [
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'deposit',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'deposit',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'withdrawal',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'withdrawal',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'deposit',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'deposit',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'deposit',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'deposit',
    amt: '5000',
    date: '24/jan/2020',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    type: 'deposit',
    amt: '5000',
    date: '24/jan/2020',
  },
]

export default withRouter(TransactionsComponent);