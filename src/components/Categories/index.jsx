import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { PageNavigation } from '../../utils/pageNavigation';
import { DetailsInfo, BlockCateDetails, PieGraph } from '../../utils/utils';
import './categories.css';

class CategoriesComponent extends Component {

  state = {
    current_search: '',
    current_category_option_to_show: '',
    pieGraphLabels: [],
    pieGraphSeries: [],
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
    this.handleSetPieGraphData();
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
  handleSetPieGraphData () {
    const labels = ['Lily', 'Azalea', 'Alyssa', 'Jasmine', 'Cedar', 'Sage']
    const series = [20, 40, 12, 98, 100, 34]

    this.setState({ pieGraphLabels: labels, pieGraphSeries: series});
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
              <p>new categories</p>
            </div>
          </div>
          <div>
            <PageNavigation
              page_details={[
                {
                  text: 'All',
                  url: '/categories'
                },
                {
                  text: 'most played',
                  url: '/categories'
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
                  figure="technology"
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
                    dummy_categories_data.map((bd, idx) => 
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

const dummy_categories_data = [
  {
    title: 'fashion',
    keyName: 'questions',
    value: '132'
  },
  {
    title: 'social media drama',
    keyName: 'questions',
    value: '300'
  },
  {
    title: 'football',
    keyName: 'questions',
    value: '200'
  },
  {
    title: 'music',
    keyName: 'questions',
    value: '400'
  },
  {
    title: 'movie',
    keyName: 'questions',
    value: '1200'
  },
  {
    title: 'nigerian politics',
    keyName: 'questions',
    value: '300'
  },
  {
    title: 'animal',
    keyName: 'questions',
    value: '400'
  },
  {
    title: 'international politics',
    keyName: 'questions',
    value: '400'
  },
  {
    title: 'maths',
    keyName: 'questions',
    value: '400'
  },
]

export default withRouter(CategoriesComponent);