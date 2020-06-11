import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../features/globals/Modal';
import Button from '../Buttons';
import './modals.css';

class BlocksModal extends Component {
  state = {
    block_name: '',
    set_time: '',
  }
  handleSetInput(e) {
    let name = e.target.getAttribute('name');
    this.setState({[name]: e.target.value})
  }
  render() {
    return (
      <div className="item_modal_container">
        <div className="flex flex-row j-space-between">
          <p className="modal_title">add blocks</p>
          <div className="modal_close" onClick={() => this.props.closeModal()} title="close">
            <i className="lni lni-close"></i>
          </div>
        </div>
        <div className="m-top20">
            <div className="add_cat_name_input">
                <label htmlFor="block_name" className="c-1">block name</label>
                <input 
                  type="text" 
                  name="block_name" 
                  placeholder="e.g Jason"
                  value={this.state.block_name} 
                  onChange={(e) => this.handleSetInput(e)}/>
            </div>
        </div>
        <div className="m-top20">
            <div className="add_cat_name_input">
                <label htmlFor="block_name" className="c-1">set time</label>
                <input 
                  type="text" 
                  name="set_time" 
                  placeholder="e.g jason@gmail.com"
                  value={this.state.set_time} 
                  onChange={(e) => this.handleSetInput(e)}/>
            </div>
        </div>
        <div className="m-top20">
          <div className="flex flex-col j-right">
              <div className="flex flex-row flex-center">
                <p className="cancel"
                  onClick={() => this.props.closeModal()}
                >
                  Cancel
                </p>
                <Button
                  text="create"
                  action={() => {}}
                  width="80px"
                />
              </div>
          </div>
        </div>
      </div>
    )
  }
}
const actions = {
  closeModal,
}
export default connect(null, actions)(BlocksModal);