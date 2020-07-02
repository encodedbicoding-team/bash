import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';
import { LineGraph } from '../../utils/utils';
import  { DetailsInfo } from '../../utils/utils';
import { UserTransDetailsBody } from './subComponent';
import { getSingleUserData } from '../../features/httpRequests/getRequests';
import './userdetails.css';


class UserDetailsComponent extends Component {
  state = {
    user_data: {},
    user_transactions: [],
    no_of_games_played: 0,
    no_of_games_won: 0,
    user_wallet_data: {},
    games_played_data: [],
    games_won_data: [],
  }

  componentDidMount() {
    this.handleSetUserId();
  }
  handleSetUserId() {
    let user_id = window.location.pathname.split('/')[4];
    this.handleFetchSingleUser(user_id);
  }
  async handleFetchSingleUser(id) {
    const result = await this.props.getSingleUserData(id);
    let result_data = result.data;
    this.setState({
      user_data: result_data.user,
      user_transactions: result_data.transactions,
      no_of_games_played: result_data.games_played_count,
      no_of_games_won: result_data.games_won_count,
      user_wallet_data: result_data.wallet,
      games_played_data: result_data.games_played,
      games_won_data: result_data.games_won
    })
  }
  handleFormatNumber(num, type) {
    if (num !== undefined) {
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
  }

  handleFormatUserTransactions(trans_array) {
    let formated_trans_data = [];
    trans_array.forEach((trans) => {
      let obj = {}
      obj['amt'] = `₦${this.handleFormatNumber(trans.amount, 'money')}`;
      obj['date'] = moment(trans.date).format('Do/MMMM/YYYY')
      obj['type'] = trans.transaction_type === 'FUND' ? 'deposit' : 'withdrawal';
      obj['id'] = trans.reference;

      formated_trans_data.push(obj)
    })
    return formated_trans_data;
  }

  handleFormatGamesData(data_array, name='') {
    let lineGraphSeries = [];
    data_array = data_array.reduce((acc, curr, idx) => {
      acc[idx] =Number(curr.score);
      return acc;
    }, [])
    lineGraphSeries.push({ data: data_array, name});
    return lineGraphSeries;
  }
  render() {
    const { requestSingleUserData } = this.props;
    const user = {
      full_name: requestSingleUserData ? 'Loading...' : `${this.state.user_data.first_name || ''} ${this.state.user_data.last_name || ''}`,
      username: requestSingleUserData ? 'Loading...' : this.state.user_data.username,
      email: requestSingleUserData ? 'Loading...' : this.state.user_data.email,
      id: requestSingleUserData ? 'Loading...' : this.state.user_data.id,
      status: requestSingleUserData ? 'Loading...' : this.state.user_data.is_verified ? 'verified' : 'unverified',
      last_visited: requestSingleUserData ? 'Loading...' : moment(this.state.user_data.last_login).format('Do/MMMM/YYYY'),
      phone: requestSingleUserData ? 'Loading...' : this.state.user_data.phone_number,
    }
    const games_played = requestSingleUserData ? 'loading...' : this.handleFormatNumber(this.state.no_of_games_played);
    const games_won = requestSingleUserData ? 'loading...' : this.handleFormatNumber(this.state.no_of_games_won);

    const user_wallet = {
      wallet_balance: requestSingleUserData ? 'loading...' : `₦${this.handleFormatNumber(this.state.user_wallet_data.naira_balance, 'money')}`,
      coin_balance: requestSingleUserData ? 'loading...' : `${this.handleFormatNumber(this.state.user_wallet_data.bash_coin_balance)}BC`,
      fifty_fifty_balance: requestSingleUserData ? 'loading...' : this.handleFormatNumber(this.state.user_wallet_data.fifty_fifty_balance),
      add_time_balance: requestSingleUserData ? 'loading...' : this.handleFormatNumber(this.state.user_wallet_data.add_time_balance),
    }

    const user_transactions = requestSingleUserData ? 'loading...' : this.handleFormatUserTransactions(this.state.user_transactions);
    let games_played_graph_data = this.handleFormatGamesData(this.state.games_played_data, 'score');
    let games_won_graph_data = this.handleFormatGamesData(this.state.games_won_data, 'score');

    return (
      <div className="user_details_component_containers">
        <div className="user_details_component_header">
          <Link to="/users" className="items_back_link">
            <div className="user_details_items_back">
              <div>
                <i className="lni lni-chevron-left"></i>
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
        <div className="user_details_component_body">
            <div className="user_details_comp1">
              <div className="">
                <div className="user_details_profile_container">
                  <div className="user_details_profile_head">
                    <div className="u_profile_h">
                      <div className="u_profile_image_c">
                        <img src={this.state.user_data.photo_url || require('../../assets/images/random_user.jpg')} alt="user profile logo" width="100%" height="auto"/>
                      </div>
                      <div>
                        <p 
                          id="u_profile_name"
                          className="capitalize">{user.full_name}</p>
                        <p className="capitalize font-small" id="u_profile_username">{user.username}</p>
                      </div>
                    </div>
                    <div>
                      <div className="u_profile_data">
                        <p>ID</p>
                        <p>{user.id}</p>
                      </div>
                      <div className="u_profile_data">
                        <p>EMAIL</p>
                        <p>{user.email}</p>
                      </div>
                      <div className="u_profile_data">
                        <p>PHONE #</p>
                        <p>{user.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="user_details_profile_body">
                    <div className="u_profile_data">
                        <p>STATUS</p>
                        <p id={user.status === 'verified' ? "status-verified" : "status-not-verified"}>
                          {
                            user.status
                          }
                        </p>
                    </div>
                    <div className="u_profile_data">
                        <p>LAST VISITED</p>
                        <p className="upper">{user.last_visited}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u_profile_games_details_cont">
                <div className="u_profile_games_details">
                  <div className="u_profile_graph">
                    <LineGraph series={games_played_graph_data}/>
                  </div>
                  <div className="u_profile_gd">
                      <p className="u_profile_games_p">GAMES PLAYED</p>
                      <p className="u_profile_games_count">{games_played}</p>
                  </div>
                  <div className="u_profile_graph">
                  <LineGraph series={games_won_graph_data}/>
                  </div>
                  <div className="u_profile_gdw">
                      <p className="u_profile_games_p">GAMES WON</p>
                      <p className="u_profile_games_count">{games_won}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="u_profile_graph">
                  <LineGraph series={games_won_graph_data}/>
              </div>
              <div className="u_profile_balance">
                <div className="flex flex-row">
                  <div>
                    <DetailsInfo
                      title="wallet balance"
                      figure={user_wallet.wallet_balance}
                      color="#26C0C7"
                      font_size="30px"
                      w="200px"
                    />
                  </div>
                  <div>
                  <div>
                    <DetailsInfo
                      title="coin balance"
                      figure={user_wallet.coin_balance}
                      color="#5AA9FA"
                      font_size="30px"
                      w="160px"
                      border_right={false}
                    />
                  </div>
                  </div>
                </div>
                <div className="u_profile_lifelines">
                  <p id="lifelines">Lifelines</p>
                  <div className="flex flex-row">
                    <div>
                      <DetailsInfo
                        title="50/50"
                        figure={user_wallet.fifty_fifty_balance}
                        font_size="15px"
                        w="70px"
                      />
                    </div> 
                    <div>
                      <DetailsInfo
                        title="add-time"
                        figure={user_wallet.add_time_balance}
                        font_size="15px"
                        w="70px"
                        border_right={false}
                      />
                    </div> 
                  </div>
                </div>
              </div>
              <div className="u_details_transactions">
                <div>
                  <p id="u_details_trans_header">Transactions</p>
                  {
                    user_transactions === 'loading...' ? 
                    <div>
                      <p>Loading...</p>
                    </div>
                      :
                      user_transactions.length <= 0 ?
                      <div>
                        <p>No Transactions yet</p>
                      </div>
                      :
                      <>
                      <div className="u_details_trans_table_head">
                        <div>
                          <p className="upper">transaction type</p>
                        </div>
                        <div>
                          <p className="upper">amount</p>
                        </div>
                        <div>
                          <p className="upper">date</p>
                        </div>
                        <div className="flex flex-row pr_eye j-space-between d-none">
                          <i className="lni lni-printer"></i>
                          <i className="lni lni-eye"></i>
                        </div>
                      </div>
                      <div className="u_details_trans_table_body_cont">
                        {
                         user_transactions.map((details, idx) => 
                            <UserTransDetailsBody
                            key={idx}
                            amt={details.amt}
                            date={details.date}
                            type={details.type}
                            id={details.id}
                            />
                          )
                        }
                      </div>
                    </>
                  }
                </div>

              </div>
            </div>
        </div>
      </div>
    )
  }
}


const actions = {
  getSingleUserData
}
const mapStateToProps = state => ({
  requestSingleUserData: state.httpGetRequests.requestingSingleUserData
})

export default connect(mapStateToProps, actions)(withRouter(UserDetailsComponent));