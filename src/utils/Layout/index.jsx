import React, { Component } from 'react';
import { connect } from 'react-redux';
import sidenavedata from '../sidenavdata';
import SideNavComponent from '../../components/SideNav/SideComponent'; 
import TopNav from '../../components/TopNav';
import './layout.css';
import Modal from '../../app/globals/modal';
import { CategoryModal, BlocksModal } from '../../components/Modals';


class Layout extends Component {
  render() {
    return (
      <>
      {
        this.props.showingModal ?
        <Modal>
          {
            this.props.modalShow === 'categories' ?
            <CategoryModal/>
            :
            this.props.modalShow === 'blocks' ?
            <BlocksModal/>
            :
            ''
          }
        </Modal>
        :
        ''
      }
      <div className="layout">
        <section className="layout_container">
          <section className="navigation">
            <TopNav/>
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
          <section className="footer flex flex-center">
            <div className="footer_content">
                <footer>Bash <span>&copy;</span> {new Date().getFullYear()}. All Rights Reserved</footer>
            </div>
          </section>
        </section>
      </div>
      </>
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


const mapStateToProps = state => ({
  showingModal: state.modal.showingModal,
  modalShow: state.modal.modalShow,
})

export default connect(mapStateToProps, null)(Layout);