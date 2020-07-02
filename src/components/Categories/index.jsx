import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from '../Buttons';
import { PageNavigation } from '../../utils/pageNavigation';
import { DetailsInfo, BlockCateDetails, PieGraph, LineGraph } from '../../utils/utils';
import { showModal } from '../../features/globals/Modal';
import { getAllCategoriesData } from '../../features/httpRequests/getRequests';
import './categories.css';

class CategoriesComponent extends Component {

  state = {
    current_search: '',
    current_category_option_to_show: '',
    pieGraphLabels: [],
    pieGraphSeries: [],
    lineGraphLabels: [],
    lineGraphSeries: [],
    showCategoryModal: true,
    total_categories: 0,
    all_categories_data: [],
    retries: 1,
  }

  componentDidMount() {
    this.handleSetCurrentSearch();
    document.onclick = ((e) => {
      let ele_class = e.target.getAttribute('class');
      if (ele_class) {
        if (!ele_class.startsWith('lni')) {
          this.setState({ current_category_option_to_show: ''})
        }
      }
    });
    this.handleSetCategoriesStateData();
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.props.requestAllCategoriesData === true) {
      if (this.state.retries !== 0) {
        this.setState({
          retries: this.state.retries - 1,
        })
       this.handleFetchCategoriesData();
      }
    }
  }

  async handleSetCategoriesStateData() {
    try {
      const categories_data = JSON.parse(sessionStorage.getItem('<3_EBC__updated__categories_dash_data<3_EBC'));
      if (categories_data.categories) {
        this.setState({
          total_categories: categories_data.categories.length,
          all_categories_data: this.handleFormatAllCategoriesData(categories_data.categories),
          lineGraphLabels: this.handleFormatLineGraphData(categories_data.category_stat).lineGraphLabels,
          lineGraphSeries: this.handleFormatLineGraphData(categories_data.category_stat).lineGraphSeries,
          pieGraphLabels: this.handleFormatPieGraphData(categories_data.category_stat).pieGraphLabels,
          pieGraphSeries: this.handleFormatPieGraphData(categories_data.category_stat).pieGraphSeries
        })
      }
      await this.handleFetchCategoriesData();
    } catch(err) {
      console.log(err)
    }
  }

 async handleFetchCategoriesData() {
    try {
      const categories_data = await this.props.getAllCategoriesData();
      sessionStorage.setItem('<3_EBC__updated__categories_dash_data<3_EBC', JSON.stringify(categories_data.data))
      if (categories_data.data.categories) {
        this.setState({
          total_categories: categories_data.data.categories.length,
          all_categories_data: this.handleFormatAllCategoriesData(categories_data.data.categories),
          lineGraphLabels: this.handleFormatLineGraphData(categories_data.data.category_stat).lineGraphLabels,
          lineGraphSeries: this.handleFormatLineGraphData(categories_data.data.category_stat).lineGraphSeries,
          pieGraphLabels: this.handleFormatPieGraphData(categories_data.data.category_stat).pieGraphLabels,
          pieGraphSeries: this.handleFormatPieGraphData(categories_data.data.category_stat).pieGraphSeries
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  handleFormatAllCategoriesData(cate_array) {
    let new_data = [];
    cate_array.forEach((cate) => {
      let obj = {};
      obj['title'] = cate.name;
      obj['keyName'] = 'questions';
      obj['value'] = cate.questions_count;
      obj['id'] = cate.id

      new_data.push(obj)
    })
    return new_data
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

  handleSetCurrentSearch() {
    const search = this.props.location.search.split('=')[1];
    if (search) {
      this.setState({ current_search: search.replace(/%20/g, ' ') || 'all'});
    } else {
      this.setState({ current_search: search || 'all'});
    }
  }
  checkCategoryOptionActive(id) {
    if (this.state.current_category_option_to_show === id) {
      return true
    } else {
      return false;
    }
  }
  handleShowModal() {
    this.setState({showCategoryModal: !this.state.showCategoryModal })
  }
 
  handleSetCategoryOption(id) {
    if (this.state.current_category_option_to_show === id) {
      this.setState({ current_category_option_to_show: ''})
    } else {
      this.setState({ current_category_option_to_show: id})
    }
  }
  render() {
    return (
      <div className="categories_main_container">
        <div>
          <div className="page_title_cont">
            <p className="page_title">Categories</p>
            <div>
              <Button text="New Categories" add={true} action={() => this.props.showModal('categories')} width="100%"/>
            </div>
          </div>
          <div>
            <PageNavigation
              page_details={[
                {
                  text: 'All',
                  url: '/categories'
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
                  figure={this.state.total_categories}
                  width="200px"
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
                    this.state.all_categories_data.map((bd, idx) => 
                    <BlockCateDetails
                      key={idx}
                      title={bd.title}
                      keyName={bd.keyName}
                      value={bd.value}
                      showImg={true}
                      active={this.checkCategoryOptionActive(idx)}
                      fn={() => this.handleSetCategoryOption(idx)}
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
  getAllCategoriesData
}
const mapStateToProps = state => ({
  requestAllCategoriesData: state.httpGetRequests.requestAllCategoriesData,
})

export default connect(mapStateToProps, actions)(withRouter(CategoriesComponent));