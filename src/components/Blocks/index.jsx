import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Button from '../Buttons';
import { PageNavigation } from '../../utils/pageNavigation';
import { showModal } from '../../features/globals/Modal';
import { getAllBlocksData } from '../../features/httpRequests/getRequests';
import { DetailsInfo, BlockCateDetails, PieGraph, LineGraph } from '../../utils/utils';
import './blocks.css'

class BlocksComponent extends Component {

  state = {
    current_search: '',
    current_block_option_to_show: '',
    pieGraphLabels: [],
    pieGraphSeries: [],
    lineGraphLabels: [],
    lineGraphSeries: [],
    total_blocks: 0,
    most_played: '',
    all_blocks_data: [],
    retries: 1,
  }
  componentDidMount() {
    try{
      this.handleSetCurrentSearch();
      document.onclick = ((e) => {
        let ele_class = e.target.getAttribute('class');
        if (ele_class) {
          if (!ele_class.startsWith('lni')) {
            this.setState({ current_block_option_to_show: ''})
          }
        }
      });
      this.handleSetBlocksStateData();
    }catch(err) {
      console.log(err)
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.props.requestAllBlocksData === true) {
      if (this.state.retries !== 0) {
        this.setState({
          retries: this.state.retries - 1,
        })
       this.handleFetchBlocksData();
      }
    }
  }

  async handleSetBlocksStateData() {
    try{
      const blocks_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__blocks_dash_data<3_EBC'));
      if (blocks_data.blocks) {
        this.setState({
          total_blocks: blocks_data.total_count,
          most_played: blocks_data.most_played,
          all_blocks_data: this.handleFormatAllBlocksData(blocks_data.blocks),
          lineGraphLabels: this.handleFormatLineGraphData(blocks_data.blocks_stat).lineGraphLabels,
          lineGraphSeries: this.handleFormatLineGraphData(blocks_data.blocks_stat).lineGraphSeries,
          pieGraphSeries: this.handleFormatPieGraphData(blocks_data.blocks_stat).pieGraphSeries,
          pieGraphLabels: this.handleFormatPieGraphData(blocks_data.blocks_stat).pieGraphLabels
        })
      }
  
      await this.handleFetchBlocksData();
    }catch(err) {
      console.log(err)
    }
  }

  async handleFetchBlocksData() {
    try{
      const blocks_data = await this.props.getAllBlocksData();
      sessionStorage.setItem('<3_EBC__updated__blocks_dash_data<3_EBC', JSON.stringify(blocks_data.data))
      this.setState({
        total_blocks: blocks_data.data.total_count,
        most_played: blocks_data.data.most_played,
        all_blocks_data: this.handleFormatAllBlocksData(blocks_data.data.blocks),
        lineGraphLabels: this.handleFormatLineGraphData(blocks_data.data.blocks_stat).lineGraphLabels,
        lineGraphSeries: this.handleFormatLineGraphData(blocks_data.data.blocks_stat).lineGraphSeries,
        pieGraphSeries: this.handleFormatPieGraphData(blocks_data.data.blocks_stat).pieGraphSeries,
        pieGraphLabels: this.handleFormatPieGraphData(blocks_data.data.blocks_stat).pieGraphLabels
      })
    }catch(err) {
      console.log(err);
    }
  }

  handleFormatAllBlocksData(blocks_array) {
    let new_data = [];
    blocks_array.forEach((block) => {
      let obj = {};
      obj['title'] = block.name;
      obj['keyName'] = 'time';
      obj['value'] = block.time;
      obj['id'] = block.id

      new_data.push(obj)
    })
    return new_data;
  }

  checkBlockOptionActive(id) {
    if (this.state.current_block_option_to_show === id) {
      return true
    } else {
      return false;
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
              <Button text="New Block" add={true} action={() => this.props.showModal('blocks')} width="100%"/>
            </div>
          </div>
          <div>
            <PageNavigation
              page_details={[
                {
                  text: 'All',
                  url: '/blocks'
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
                  figure={this.state.total_blocks}
                  w="100px"
                />
              </div>
              <div>
              <DetailsInfo
                  title="most played"
                  figure={this.state.most_played}
                  w="300px"
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
          <div className="block_cat_main_container">
              <div className="block_cat_sub_container">
                  {
                    this.state.all_blocks_data.map((bd, idx) => 
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

const actions = {
  showModal,
  getAllBlocksData
}

const mapStateToProps = state => ({
  requestAllBlocksData: state.httpGetRequests.requestAllBlocksData
})

export default connect(mapStateToProps, actions)(withRouter(BlocksComponent));