import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { SubComponents,
        LargeSubComponentWithGraph,
        Graph,
        UserTransDetails
  } from './subComponents';

import { DetailsInfo } from '../../utils/utils';
import  { 
  getAllUsers, 
  getAllBlocksData, 
  getAllCategoriesData,
  getAllTransData,
} from '../../features/httpRequests/getRequests';

import './dashboard.css';

class DashboardComponent extends Component {

  state = {
    hasUpdated: false,
    total_blocks: 0,
    total_categories: 0,
    total_users: 0,
    total_games_played: 0,
    amount_deposited: 0,
    amount_won: 0,
    user_trans_data: [],
    trans_graph_data: [],
    requestAllUserData: false,
    retries: 1,
  }

  componentDidMount() {
    // handleFetchDashData;
    const updated_users_dash_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__users_dash_data<3_EBC'));
    if (updated_users_dash_data) {
      this.setState({
        hasUpdated: true,
      })
    }
    this.handleFetchDashData();

    this.handleSetDashData();
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.props.requestAllUsersData === true) {
      if (this.state.retries !== 0) {
        this.setState({
          retries: this.state.retries - 1,
        })
        this.handleFetchDashData();
      }
    }

    if (this.state.hasUpdated !== nextState.hasUpdated) {
      this.handleSetDashData();
    }
  }

  async handleFetchDashData() {
    // get data;
    const resultForAllUsers = await this.props.getAllUsers();
    sessionStorage.setItem('<3_EBC__updated__users_dash_data<3_EBC', JSON.stringify(resultForAllUsers.results.data));
    const resultForAllBlocks = await this.props.getAllBlocksData();
    sessionStorage.setItem('<3_EBC__updated__blocks_dash_data<3_EBC', JSON.stringify(resultForAllBlocks.data))
    const resultForAllCategories = await this.props.getAllCategoriesData();
    sessionStorage.setItem('<3_EBC__updated__categories_dash_data<3_EBC', JSON.stringify(resultForAllCategories.data));
    const resultForAllTrans = await this.props.getAllTransData();
    sessionStorage.setItem('<3_EBC__updated__trans_dash_data<3_EBC', JSON.stringify(resultForAllTrans.results.data))
    this.setState({
      hasUpdated: true,
    })

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

  handleSetDashData() {
    if (!this.state.hasUpdated) {
      const current_dash_data = JSON.parse(sessionStorage.getItem('<3_EBC__bash__ad__dash_data<3_EBC'));
      let trans_data = this.handleFormatDataForTransaction(current_dash_data.transactions);
      let graph_data = this.handleFormatTransGraphData(current_dash_data.transactions);
      this.setState({
        total_blocks: current_dash_data.blocks_count,
        total_categories: current_dash_data.categories_count,
        total_users: current_dash_data.users_count,
        amount_deposited: current_dash_data.amount_deposited,
        amount_won: current_dash_data.amount_won,
        total_games_played: current_dash_data.games_played,
        user_trans_data: trans_data,
        trans_graph_data: graph_data
      })
    } else {
      const updated_users_dash_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__users_dash_data<3_EBC'));
      const updated_blocks_dash_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__blocks_dash_data<3_EBC'));
      const updated_categories_dash_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__categories_dash_data<3_EBC'));
      const updated_trans_dash_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__trans_dash_data<3_EBC'));
      let trans_data = this.handleFormatDataForTransaction(updated_trans_dash_data.transactions)
      let graph_data = this.handleFormatTransGraphData(updated_trans_dash_data.transactions);
      this.setState({
        total_users: updated_users_dash_data.total_count,
        total_games_played: updated_users_dash_data.games_played,
        total_blocks: updated_blocks_dash_data.total_count,
        total_categories: updated_categories_dash_data.categories.length,
        user_trans_data: trans_data,
        trans_graph_data: graph_data
      })
    }
  }

  handleFormatDataForTransaction(trans_array) {
    let new_trans_data = [];
    trans_array.forEach((data) => {
      let obj = {};
      obj['amt'] = this.handleFormatNumber(data.amount, 'money');
      obj['trans_date'] = moment(data.date).format('Do/MMMM/YYYY');
      obj['type'] = data.transaction_type === 'PURCHASE' ? 'withdrawal' : 'deposit';
      obj['img_src'] = data.wallet.owner.photo_url;
      obj['first_name'] = !data.wallet.owner.first_name ? data.wallet.owner.last_name : data.wallet.owner.first_name;
      obj['last_name'] = data.wallet.owner.last_name;

      new_trans_data.push(obj);
    })

    return new_trans_data;
  }

  handleFormatTransGraphData(trans_array) {
    let graph_data = [];
    trans_array.forEach((data,idx) => {
      let obj = {};
      obj['name'] = `${data.transaction_type}-${idx}`;
      obj['amount'] = parseInt(data.amount).toFixed(0);

      graph_data.push(obj)
    })

    return graph_data
  } 

  render() {
    return (
      <div className="dashboard_main_container">
        <div>
          <div className="page_title">
            <p>Dashboard</p>
          </div>
          <div className="flex flex-row dash_details_place">
              <div>
                <DetailsInfo 
                  title="visitors"
                  figure="59,364"
                  w="120px"
                />
              </div>
              <div>
                <DetailsInfo 
                  title="games played"
                  figure={this.handleFormatNumber(this.state.total_games_played)}
                  w="140px"
                />
              </div>
              <div>
                <DetailsInfo 
                  title="amount deposited"
                  figure={`₦${this.handleFormatNumber(this.state.amount_deposited, 'money')}`}
                  w="160px"
                />
              </div>
              <div>
                <DetailsInfo 
                  title="amount won"
                  figure={`₦${this.handleFormatNumber(this.state.amount_won, 'money')}`}
                  border_right={false}
                />
              </div>
          </div>
          <div className="dashboard_data_grid">
            <div className="">
              <div>
                <div className="flex flex-col dash_sub_main_container">
                  <div className="dash_rt_chart_container">
                    <p className="font-primary font-medium dash_rt">Recent Transactions</p>
                    <div className="comp-size-1024">
                      <Graph 
                        w={679}
                        graph_data={this.state.trans_graph_data}
                      />
                    </div>
                  </div>
                  <div className="users_transactions_container">
                    <div className="sub_user_trans_container">
                      {
                        this.state.user_trans_data.map((user_data, idx) => (
                          <UserTransDetails 
                            key={idx}
                            amt={user_data.amt}
                            first_name={user_data.first_name}
                            last_name={user_data.last_name}
                            trans_date={user_data.trans_date}
                            type={user_data.type}
                            img_src={user_data.img_src}
                          />
                        ))
                      }
                    </div>
                    <div className="view_all_container">
                      <Link className="link view-all-link"
                      to='/#'
                      >
                        <div className="capitalize dash-view-all">
                          <span>view all</span>
                          <i className="lni lni-chevron-right"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <div className="dash_minor_container">
                  <div className="">
                    <div>
                      <SubComponents
                        image_name="lni lni-grid-alt"
                        sub_text="block"
                        sub_data={this.handleFormatNumber(this.state.total_blocks)}
                        url="blocks"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <SubComponents
                        image_name="lni lni-list"
                        sub_text="categories"
                        sub_data={this.handleFormatNumber(this.state.total_categories)}
                        url="categories"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div>
                    <LargeSubComponentWithGraph 
                      image_name="lni lni-users"
                      sub_text="total users"
                      sub_data={this.handleFormatNumber(this.state.total_users)}
                      url="users"
                      w={353}
                      graph_data={dummy_graph_data}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const dummy_graph_data = [{
  name: "Page A",
  uv: 4000,
  pv: 2400,
  amount: 2400
},
{
  name: "Page B",
  uv: 3000,
  pv: 1398,
  amount: 2210
},
{
  name: "Page C",
  uv: 2000,
  pv: 9800,
  amount: 2290
},
{
  name: "Page D",
  uv: 2780,
  pv: 3908,
  amount: 2000
},
{
  name: "Page E",
  uv: 1890,
  pv: 4800,
  amount: 2181
},
{
  name: "Page F",
  uv: 2390,
  pv: 3800,
  amount: 2500
},
{
  name: "Page G",
  uv: 3490,
  pv: 4300,
  amount: 2100
},
{
  name: "Page A",
  uv: 4000,
  pv: 2400,
  amount: 2400
},
{
  name: "Page B",
  uv: 3000,
  pv: 1398,
  amount: 2210
},
]

const actions = {
  getAllUsers,
  getAllBlocksData,
  getAllCategoriesData,
  getAllTransData,
}

const mapStateToProps = state => ({
  requestAllUsersData: state.httpGetRequests.requestingAllUsersData,
})

export default connect(mapStateToProps, actions)(DashboardComponent);
