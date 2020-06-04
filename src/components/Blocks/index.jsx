import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { PageNavigation } from '../../utils/pageNavigation';
import { DetailsInfo, BlockCateDetails, PieGraph } from '../../utils/utils';
import './blocks.css'

class BlocksComponent extends Component {

  state = {
    current_search: '',
    current_block_option_to_show: '',
    pieGraphLabels: [],
    pieGraphSeries: [],
  }
  componentDidMount() {
    this.handleSetCurrentSearch();
    document.onclick = ((e) => {
      let ele_class = e.target.getAttribute('class');
      if (ele_class) {
        if (!ele_class.startsWith('lni')) {
          this.setState({ current_block_option_to_show: ''})
        }
      }
    });
    this.handleSetPieGraphData();
  }
  checkBlockOptionActive(id) {
    if (this.state.current_block_option_to_show === id) {
      return true
    } else {
      return false;
    }
  }
  handleSetPieGraphData () {
    const labels = ['Lily', 'Azalea', 'Alyssa', 'Jasmine', 'Cedar', 'Sage']
    const series = [20, 40, 12, 98, 100, 34]

    this.setState({ pieGraphLabels: labels, pieGraphSeries: series});
  }
  handleSetBlockOption(id) {
    if (this.state.current_block_option_to_show === id) {
      this.setState({ current_block_option_to_show: ''})
    } else {
      this.setState({ current_block_option_to_show: id})
    }
  }
  handleSetCurrentSearch() {
    const search = this.props.location.search.split('=')[1];
    if (search) {
      this.setState({ current_search: search.replace(/%20/g, ' ') || 'all'});
    } else {
      this.setState({ current_search: search || 'all'});
    }
  }

  render() {
    return (
      <div className="blocks_main_container">
        <div>
          <div className="page_title_cont">
            <p className="page_title">Blocks</p>
            <div>
              <p>new block</p>
            </div>
          </div>
          <div>
            <PageNavigation
              page_details={[
                {
                  text: 'All',
                  url: '/blocks'
                },
                {
                  text: 'most played',
                  url: '/blocks'
                }
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
                  title="most played"
                  figure="azalea"
                  width="120px"
                  border_right={false}
                />
              </div>
          </div>
          <div className="m-top20 page_chart_data">
              <div className="page_chart_graph">
                graph
              </div>
              <div>
                <PieGraph
                  labels={this.state.pieGraphLabels}
                  series={this.state.pieGraphSeries}
                  width={380}
                />
              </div>
          </div>
          <div className="block_cat_main_container">
              <div className="block_cat_sub_container">
                  {
                    dummy_block_data.map((bd, idx) => 
                    <BlockCateDetails
                      key={idx}
                      title={bd.title}
                      keyName={bd.keyName}
                      value={bd.value}
                      showImg={false}
                      active={this.checkBlockOptionActive(idx)}
                      fn={() => this.handleSetBlockOption(idx)}
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

const dummy_block_data = [
  {
    title: 'lily',
    keyName: 'time',
    value: '12:00am'
  },
  {
    title: 'azalea',
    keyName: 'time',
    value: '3:00am'
  },
  {
    title: 'alyssa',
    keyName: 'time',
    value: '6:00am'
  },
  {
    title: 'jasmine',
    keyName: 'time',
    value: '9:00am'
  },
  {
    title: 'cedar',
    keyName: 'time',
    value: '12:00pm'
  },
  {
    title: 'basel',
    keyName: 'time',
    value: '3:00pm'
  },
  {
    title: 'sage',
    keyName: 'time',
    value: '6:00pm'
  },
  {
    title: 'ivy',
    keyName: 'time',
    value: '9:00pm'
  },
]

export default withRouter(BlocksComponent);