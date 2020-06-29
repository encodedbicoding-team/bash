import React, { Component } from 'react';
import LogoContainer from '../Logo';
import './topnav.css';

class TopNav extends Component {
  state = {
    showSearchPanel: false,
    searchValue: ''
  }
  componentDidMount() {
    window.onkeyup = (e => {
      if (e.code === 'Enter' && this.state.searchValue) {
        console.log(this.state.searchValue)
        this.setState({ showSearchPanel: false })
      }
    })
    window.onclick = ((e) => {
      let eclass = e.target.getAttribute('class');
      if (!eclass) {
        this.setState({ showSearchPanel: false, searchValue: '' })
      }
      if (eclass) {
        if ((eclass === 'show_search_panel_cont' || eclass==='searchInput') && this.state.showSearchPanel) {
          return;
        }
        if ((eclass === 'lni lni-search-alt' || eclass === 'search_icon') && !this.state.showSearchPanel) {
          this.setState({ showSearchPanel: !this.state.showSearchPanel, searchValue: '' });
        }
        if ((eclass !== 'lni lni-search-alt' && eclass !== 'search_icon') && this.state.showSearchPanel) {
          this.setState({ showSearchPanel: false, searchValue: '' })
        }
      }
    })
  }
  handleShowSearchPanel() {
    this.setState({ showSearchPanel: !this.state.showSearchPanel });
  }
  handleChangeValue(e) {
    const ele_name = e.target.getAttribute('name');
    this.setState({ [ele_name]: e.target.value})
  }
  render() {
    return (
      <>
      <div className={this.state.showSearchPanel ? 'show_search_panel_cont search_cont' : 'hide_search_panel search_cont'}>
        <div className="flex flex-row flex-center">
          <div onClick={() => this.handleShowSearchPanel()} className="close_search">
            <i className="lni lni-chevron-right"></i>
          </div>
          <div className="flex flex-row j-space-between search_place_cont br">
              <i className="lni lni-search-alt"></i>
              <input type="text" name="searchValue" value={this.state.searchValue} onChange={(e) => this.handleChangeValue(e)} className="searchInput" placeholder="Search"/>
          </div>
        </div>
        <p className="hit_enter_desc w-100">
          Hit Enter to search
        </p>
      </div>
      <div className="top_nav_main_container">
        <div>
          <LogoContainer/>
        </div>
        <div className="top_nav_search_cont">
          <div className="search_icon">
            <i className="lni lni-search-alt"></i>
          </div>
          <div className="admin_logo_cont">
            <img src={require('../../assets/images/random_user.jpg')} alt="admin user logo" width="100%" height="auto"/>
          </div>
        </div>
      </div>
    </>
    )
  }
}

export default TopNav;

