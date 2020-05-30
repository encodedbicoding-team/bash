import React from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Tooltip, Area } from 'recharts';
import './subComp.css';

const SubComponents = ({image_name, sub_text, sub_data, url}) => (

    <div className="sublink_container sublink_container_size">
      <Link className="sublink_link" to={{
        pathname: `/${url}`
      }}> 
      <div className="sublink_component_image">
        <i className={`${image_name}`}></i>
      </div>
      <div className="sublink_main_content">
        <div className="sublink_main_texts">
          <p className="capitalize sub_sm">{sub_text}</p>
          <p className="sub_lg">{sub_data}</p>
        </div>
        <div className="sublink_main_image">
          <img
             src={require('../../../assets/images/spiral.png')}
             alt={`Bash ${image_name} simple component`}
             width="150px"
             height="auto"/>
        </div>
      </div>
      </Link>
    </div>
)

const LargeSubComponentWithGraph = ({image_name, sub_text, sub_data, graph_data, url, w}) => (
  <div className="large_sublink_container large_sublink_container_size">
    <Link className="sublink_link" to={{
        pathname: `/${url}`
      }}>
      <div className="large_sublink_sub_content">
        <div className="sublink_component_image lsi">
          <i className={`${image_name}`}></i>
          <div className="large_sublinks_graph">
            <Graph w={w} graph_data={graph_data}/>
          </div>
        </div>
      </div>
      <div className="large_sublink_main_content">
        <div>
          <p className="capitalize sub_sm">{sub_text}</p>
          <p className="sub_lg">{sub_data}</p>
        </div>
        <div className="large_sublink_main_image">
            <img
              src={require('../../../assets/images/spiral.png')}
              alt={`Bash ${image_name} simple component`}
              width="150px"
              height="auto"/>
        </div>
      </div>
    </Link>
  </div>
)

const Graph = ({graph_data, w}) => (
  <>
    <div>
      <AreaChart
        width={w}
        height={99}
        data={graph_data}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#26C0C726" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#26C0C726" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amt"
          stroke="#26C0C759"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  </>
)

const UserTransDetails = ({img_src, first_name, last_name, amt, trans_date}) => (
  <>
    <div className="user_trans_contents">
        <div className="user_name_image">
          <div className="details_main_image_container br">
              <img width="100%" height="auto" src={img_src} alt="bash users transactions"/>
          </div>
          <div className="details_main_user_container">
              <p className="flex-g-1 capitalize">{first_name}</p>
              <p className="capitalize font-small">{last_name}</p>
          </div>
        </div>
        <div className="user_trans_deposit_container">
          <p>Deposit</p>
        </div>
        <div className="user_trans_amount">
          <p>{`₦${amt}`}</p>
        </div>
        <div className="user_trans_date">
          <p>{trans_date}</p>
        </div>

    </div>
  </>
)



export {
  SubComponents,
  LargeSubComponentWithGraph,
  Graph,
  UserTransDetails
}