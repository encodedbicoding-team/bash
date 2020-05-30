import React, { Component } from 'react';
import sidenavedata from '../sidenavdata';
import SideNavComponent from '../../components/SideNav/SideComponent'; 
import './layout.css';

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <section className="layout_container">
          <section className="navigation">
          <div>nv</div>
          </section>
          <section className="sidebar">
            <div className="side_nav_items">
              {
                sidenavedata.map((snd, idx) => 
                <SideNavComponent 
                  key={idx}
                  image_class={snd.image_class}
                  text={snd.text}
                  url={`${snd.url}`}
                  image_color={snd.image_color}
                  active={checkActiveNav(snd.text)}
                />)
              }
            </div>
          </section>
          <section className="main_body">
          {
            this.props.children
          }
          </section>
          <section className="footer">
          <div>ft</div>
          </section>
        </section>
      </div>
    )
  }
}

function checkActiveNav(text) {
  const pathname = window.location.pathname.split('/')[2];
  if (text === pathname) {
    return true
  } else {
    return false
  }
}

export default Layout;