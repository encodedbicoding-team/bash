import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { Graph } from '../Dashboard/subComponents';
import  { DetailsInfo } from '../../utils/utils';
import { UserTransDetailsBody } from './subComponent';
import './userdetails.css';


class UserDetailsComponent extends Component {
  render() {
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
                      <div className="u_profile_image_c br">
                        <img src="./d" alt="user profile logo" width="100%" height="auto"/>
                      </div>
                      <div>
                        <p 
                          id="u_profile_name"
                          className="capitalize">john doe</p>
                        <p className="capitalize font-small" id="u_profile_username">johndoe</p>
                      </div>
                    </div>
                    <div>
                      <div className="u_profile_data">
                        <p>ID</p>
                        <p>0000000000001</p>
                      </div>
                      <div className="u_profile_data">
                        <p>EMAIL</p>
                        <p>johndoe@email.com</p>
                      </div>
                      <div className="u_profile_data">
                        <p>PHONE #</p>
                        <p>234 09050 0440 </p>
                      </div>
                    </div>
                  </div>
                  <div className="user_details_profile_body">
                    <div className="u_profile_data">
                        <p>STATUS</p>
                        <p id="status-verified">Verified</p>
                    </div>
                    <div className="u_profile_data">
                        <p>LAST VISITED</p>
                        <p>20/MAY/2019</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u_profile_games_details_cont">
                <div className="u_profile_games_details">
                  <div className="u_profile_graph">
                    <Graph w={371} graph_data={dummy_graph_data}/>
                  </div>
                  <div className="u_profile_gd">
                      <p className="u_profile_games_p">GAMES PLAYED</p>
                      <p className="u_profile_games_count">1,345</p>
                  </div>
                  <div className="u_profile_graph">
                    <Graph w={371} graph_data={dummy_graph_data}/>
                  </div>
                  <div className="u_profile_gdw">
                      <p className="u_profile_games_p">GAMES WON</p>
                      <p className="u_profile_games_count">93</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="u_profile_graph">
                <Graph w={703} graph_data={dummy_graph_data}/>
              </div>
              <div className="u_profile_balance">
                <div className="flex flex-row">
                  <div>
                    <DetailsInfo
                      title="wallet balance"
                      figure="₦259,364"
                      color="#26C0C7"
                      font_size="30px"
                      w="160px"
                    />
                  </div>
                  <div>
                  <div>
                    <DetailsInfo
                      title="coin balance"
                      figure="72,593BC"
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
                        figure="442"
                        font_size="15px"
                        w="70px"
                      />
                    </div> 
                    <div>
                      <DetailsInfo
                        title="add-time"
                        figure="72"
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
                      dummy_user_trans_details.map((details, idx) => 
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
  amt: 2400
},
{
  name: "Page B",
  uv: 3000,
  pv: 1398,
  amt: 2210
},
{
  name: "Page C",
  uv: 2000,
  pv: 9800,
  amt: 2290
},
{
  name: "Page D",
  uv: 2780,
  pv: 3908,
  amt: 2000
},
{
  name: "Page E",
  uv: 1890,
  pv: 4800,
  amt: 2181
},
{
  name: "Page F",
  uv: 2390,
  pv: 3800,
  amt: 2500
},
{
  name: "Page G",
  uv: 3490,
  pv: 4300,
  amt: 2100
},
{
  name: "Page A",
  uv: 4000,
  pv: 2400,
  amt: 2400
},
{
  name: "Page B",
  uv: 3000,
  pv: 1398,
  amt: 2210
},
{
  name: "Page C",
  uv: 2000,
  pv: 9800,
  amt: 2290
},
{
  name: "Page D",
  uv: 2780,
  pv: 3908,
  amt: 2000
},
{
  name: "Page E",
  uv: 1890,
  pv: 4800,
  amt: 2181
},
{
  name: "Page F",
  uv: 2390,
  pv: 3800,
  amt: 2500
},
{
  name: "Page G",
  uv: 3490,
  pv: 4300,
  amt: 2100
}]

const dummy_user_trans_details = [
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 1,
    date: '24/JAN/2020'
  },
  {
    type: 'withdrawal',
    amt: '₦5,000',
    id: 2,
    date: '24/JAN/2020'
  },
  {
    type: 'withdrawal',
    amt: '₦5,000',
    id: 3,
    date: '24/JAN/2020'
  },
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 4,
    date: '24/JAN/2020'
  },
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 5,
    date: '24/JAN/2020'
  },
  {
    type: 'withdrawal',
    amt: '₦5,000',
    id: 6,
    date: '24/JAN/2020',
  },
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 7,
    date: '24/JAN/2020'
  },
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 1,
    date: '24/JAN/2020'
  },
  {
    type: 'withdrawal',
    amt: '₦5,000',
    id: 2,
    date: '24/JAN/2020'
  },
  {
    type: 'withdrawal',
    amt: '₦5,000',
    id: 3,
    date: '24/JAN/2020'
  },
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 4,
    date: '24/JAN/2020'
  },
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 5,
    date: '24/JAN/2020'
  },
  {
    type: 'withdrawal',
    amt: '₦5,000',
    id: 6,
    date: '24/JAN/2020',
  },
  {
    type: 'deposit',
    amt: '₦5,000',
    id: 7,
    date: '24/JAN/2020'
  }


]

export default withRouter(UserDetailsComponent)