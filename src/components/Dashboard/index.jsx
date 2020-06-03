import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SubComponents,
        LargeSubComponentWithGraph,
        Graph,
        UserTransDetails
  } from './subComponents';

import { DetailsInfo } from '../../utils/utils';

import './dashboard.css';

class DashboardComponent extends Component {
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
                  figure="1,939,364"
                  w="140px"
                />
              </div>
              <div>
                <DetailsInfo 
                  title="amount deposited"
                  figure="₦7,259,364"
                  w="160px"
                />
              </div>
              <div>
                <DetailsInfo 
                  title="amount won"
                  figure="₦119,234"
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
                    <div>
                      <Graph 
                        w={679}
                        graph_data={dummy_graph_data}
                      />
                    </div>
                  </div>
                  <div className="users_transactions_container">
                    {
                      dummy_user_transaction_data.map((user_data, idx) => (
                        <UserTransDetails 
                          key={idx}
                          amt={user_data.amt}
                          first_name={user_data.first_name}
                          last_name={user_data.last_name}
                          trans_date={user_data.trans_date}
                        />
                      ))
                    }
                    <div className="view_all_container">
                      <Link className="link view-all-link">
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
            <div className="bl">
              <div>
                <div className="dash_minor_container">
                  <div className="">
                    <div>
                      <SubComponents
                        image_name="lni lni-grid-alt"
                        sub_text="block"
                        sub_data="12"
                        url="block"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <SubComponents
                        image_name="lni lni-list"
                        sub_text="categories"
                        sub_data="43"
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
                      sub_data="12.5M"
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

const dummy_user_transaction_data = [
  {
    img_src: '',
    first_name: 'pascal',
    last_name: 'dabibi',
    amt: '5,000',
    trans_date: '21/jan/2020'
  },
  {
    img_src: '',
    first_name: 'francis',
    last_name: 'nzene',
    amt: '5,000',
    trans_date: '21/jan/2020'
  },
  {
    img_src: '',
    first_name: 'francisca',
    last_name: 'nzena',
    amt: '6,000',
    trans_date: '21/jan/2020'
  },
  {
    img_src: '',
    first_name: 'john',
    last_name: 'doe',
    amt: '5,000',
    trans_date: '21/jan/2020'
  },
  {
    img_src: '',
    first_name: 'encoded',
    last_name: 'bicoding',
    amt: '5,000',
    trans_date: '21/jan/2020'
  },
]

export default DashboardComponent;
