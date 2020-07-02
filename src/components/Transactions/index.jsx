import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import Swal from 'sweetalert2';
import { PageNavigation } from '../../utils/pageNavigation';
import { DetailsInfo, PieGraph, LineGraph } from '../../utils/utils';
import { getAllTransData, getTransactionsByCategory } from '../../features/httpRequests/getRequests';
import { TransMainDetail } from './subComponents';

import './transactions.css';

class TransactionsComponent extends Component {
  state = {
    current_search: '',
    pieGraphLabels: [],
    pieGraphSeries: [],
    lineGraphLabels: [],
    lineGraphSeries: [],
    total_trans: 0,
    successful_trans: 0,
    failed_trans: 0,
    all_trans_data: [],
    retries: 1,
  }
  componentDidMount() {
    try{
      this.handleSetCurrentSearch();
      this.handleRouteMatch();
    }catch(err) {
      console.log(err)
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.props.requestingAllTransData === true) {
      if (this.state.retries !== 0) {
        this.setState({
          retries: this.state.retries - 1,
        })
        if (this.props.allTransFailedData) {
          this.props.getTransactionsByCategory(this.props.allTransFailedData)
        } else {
          this.props.getAllTransData();
        }
      }
    }
  }

  async handleRouteMatch() {
    try {
      const search = this.props.location.search.split('=')[1];
      if (!search || search === 'all') {
        let trans_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__trans_dash_data<3_EBC'));
        if (trans_data.transactions) {
          this.setState({
            total_trans: trans_data.total_count,
            successful_trans: trans_data.successful_txns_count,
            failed_trans: trans_data.failed_txns_count,
            all_trans_data: this.handleFormatTransStateData(trans_data.transactions),
            lineGraphLabels: this.handleFormatLineGraphData(trans_data.txns_types_data).lineGraphLabels,
            lineGraphSeries: this.handleFormatLineGraphData(trans_data.txns_types_data).lineGraphSeries,
            pieGraphLabels: this.handleFormatPieGraphData(trans_data.txns_types_data).pieGraphLabels,
            pieGraphSeries: this.handleFormatPieGraphData(trans_data.txns_types_data).pieGraphSeries,
          })
        }
        let new_trans_data = await this.props.getAllTransData();
        sessionStorage.setItem('<3_EBC__updated__trans_dash_data<3_EBC', JSON.stringify(new_trans_data.results.data));
        new_trans_data = new_trans_data.results.data;
        this.setState({
          total_trans: new_trans_data.total_count,
          successful_trans: new_trans_data.successful_txns_count,
          failed_trans: new_trans_data.failed_txns_count,
          all_trans_data: this.handleFormatTransStateData(new_trans_data.transactions),
          lineGraphLabels: this.handleFormatLineGraphData(new_trans_data.txns_types_data).lineGraphLabels,
          lineGraphSeries: this.handleFormatLineGraphData(new_trans_data.txns_types_data).lineGraphSeries,
          pieGraphLabels: this.handleFormatPieGraphData(new_trans_data.txns_types_data).pieGraphLabels,
          pieGraphSeries: this.handleFormatPieGraphData(new_trans_data.txns_types_data).pieGraphSeries,
        })
      } else {
        const updated_trans_data = await this.props.getTransactionsByCategory(search);
        let new_trans_data = await this.props.getAllTransData();
        sessionStorage.setItem('<3_EBC__updated__trans_dash_data<3_EBC', JSON.stringify(new_trans_data.results.data));
        new_trans_data = new_trans_data.results.data;
        const updated_results = updated_trans_data.results.data;
        if (updated_trans_data) {
          this.setState({
            all_trans_data: this.handleFormatTransStateData(updated_results.transactions),
            total_trans: updated_results.total_count,
            successful_trans: updated_results.successful_txns_count,
            failed_trans: updated_results.failed_txns_count,
            lineGraphLabels: this.handleFormatLineGraphData(new_trans_data.txns_types_data).lineGraphLabels,
            lineGraphSeries: this.handleFormatLineGraphData(new_trans_data.txns_types_data).lineGraphSeries,
            pieGraphLabels: this.handleFormatPieGraphData(new_trans_data.txns_types_data).pieGraphLabels,
            pieGraphSeries: this.handleFormatPieGraphData(new_trans_data.txns_types_data).pieGraphSeries,
          })
        } else {
          Swal.fire({
            title: 'Invalid Query',
            html: 'Query is invalid\n must be one of [all, deposits, withdrawals, purchases]',
            icon: 'error'
          })
        }
      }
    }catch(err) {
      console.log(err);
    }
  }

  handleFormatLineGraphData(obj) {
    const new_array_keys = Object.keys(obj);
    const lineGraphSeries = [{ data: Object.values(obj)}]

    let lineGraphLabels = [];

    new_array_keys.forEach((k) => {
      lineGraphLabels.push(k.replace(/(_)/g, ' '))
    })
    return {
      lineGraphLabels,
      lineGraphSeries
    }

  }
  handleFormatPieGraphData(obj) {
    const new_array_keys = Object.keys(obj);
    const pieGraphSeries = Object.values(obj);

    let pieGraphLabels = [];

    new_array_keys.forEach((k) => {
      pieGraphLabels.push(k.replace(/(_)/g, ' '))
    })
    return {
      pieGraphLabels,
      pieGraphSeries
    }
  }

  handleFormatTransStateData(trans_data) {
    try{
      let new_data = [];
      trans_data.forEach((trans) => {
        let obj = {};
        obj['image_url'] = trans.wallet.owner.photo_url;
        obj['first_name'] = trans.wallet.owner.first_name?trans.wallet.owner.first_name : '';
        obj['last_name'] = trans.wallet.owner.last_name?trans.wallet.owner.last_name : '';
        obj['type'] = trans.transaction_type === 'FUND' ? 'deposit' : 'withdrawal';
        obj['amt'] = this.handleFormatNumber(trans.amount, 'money');
        obj['date'] = moment(trans.date).format('Do/MMMM/YYYY');

        new_data.push(obj);
      })
      return new_data;
    }catch(err) {
      console.log(err)
    }
  }
  handleFormatNumber(num, type) {
    num = num.toString();
    if (type !== 'money') {
      if (num.length <= 3) {
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
  handleSetCurrentSearch() {
    const search = this.props.location.search.split('=')[1];
    if (search) {
      this.setState({ current_search: search.replace(/%20/g, ' ')});
    } else {
      this.setState({ current_search: search || 'all'});
    }
  }

  render() {
    const { requestingAllTransData } = this.props;
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
                  text: 'deposits',
                  url: '/transactions'
                },
                {
                  text: 'withdrawals',
                  url: '/transactions'
                },
                {
                  text: 'purchases',
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
                  figure={this.state.total_trans}
                  width="120px"
                />
              </div>
              <div>
                <DetailsInfo
                  title="successfull"
                  figure={this.state.successful_trans}
                  width="150px"
                />
              </div>
              <div>
              <DetailsInfo
                  title="failed"
                  figure={this.state.failed_trans}
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
          {
            requestingAllTransData ?
            <div>
              <p>Loading...</p>
            </div>
            :
            this.state.all_trans_data.length <= 0?
            <div>
                <p>No transactions found!</p>
            </div>
            :
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
                  this.state.all_trans_data.map((trans, idx) => 
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
          }
        </div>
      </div>
    )
  }
}

const actions = {
  getAllTransData,
  getTransactionsByCategory,
}

const mapStateToProps = state => ({
  requestingAllTransData: state.httpGetRequests.requestingAllTransData,
  allTransFailedData: state.httpGetRequests.allTransFailedData,
  allTransDataRequestFailed: state.httpGetRequests.allTransDataRequestFailed,
})

export default connect(mapStateToProps, actions)(withRouter(TransactionsComponent));