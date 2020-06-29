import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../features/globals/Modal';
import Button from '../Buttons';
import './modals.css';

class AddAdminModal extends Component {
  state = {
    imageUrlToUpload: '',
    full_name: '',
    email: '',
    role: '',
    password: '',
    confirm_password: '',
  }
  handleFileUpload(e) {
    console.log(e.target.files[0])
  }
  handleSetInput(e) {
    let name = e.target.getAttribute('name');
    this.setState({[name]: e.target.value})
  }
  render() {
    return (
      <div className="item_modal_container">
        <div className="flex flex-row j-space-between">
          <p className="modal_title">add admin</p>
          <div className="modal_close" onClick={() => this.props.closeModal()} title="close">
            <i className="lni lni-close"></i>
          </div>
        </div>
        <div className="m-top20">
          <div className="flex flex-row flex-center w-100">
              <input 
                type="file"  
                className="display-none"
                id="adminImageUpload"
                accept="image/*"
                onChange={(e) => this.handleFileUpload(e.nativeEvent, 'adminImageUpload')}
                />

              <div className="w-100 file_chooser_img" onClick={() => document.querySelector('#adminImageUpload').click()}>
                  {
                    this.state.imageUrlToUpload ?
                    <div>image uploaded</div>
                    :
                    <div className="empty_img empty_img_radius">
                      <i className="lni lni-plus c-1"></i>
                    </div>
                  }
                  <p className="c-2">Upload image</p>
              </div>
          </div>
        </div>
        <div className="m-top20">
          <div className="add_cat_name_input">
            <label htmlFor="full_name" className="c-1">full name</label>
            <input 
              type="text" 
              name="full_name" 
              placeholder="e.g Jason"
              value={this.state.full_name} 
              onChange={(e) => this.handleSetInput(e)}/>
          </div>
        </div>
        <div className="m-top20">
          <div className="add_cat_name_input">
            <label htmlFor="email" className="c-1">email</label>
            <input 
              type="text" 
              name="email" 
              placeholder="e.g jason@email.com"
              value={this.state.email} 
              onChange={(e) => this.handleSetInput(e)}/>
          </div>
        </div>
        <div className="m-top20">
          <div className="add_cat_name_input">
            <label htmlFor="role" className="c-1">role</label>
              <select
                name="role"
                value={this.state.role}
                onChange={(e) => this.handleSetInput(e)}
              >
                <option selected={true}>Select a role</option>
                <option value="option">Option</option>
                <option value="option">Option</option>
              </select>
          </div>
        </div>
        <div className="m-top20">
          <div className="add_cat_name_input">
            <label htmlFor="password" className="c-1">password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="******"
              value={this.state.password} 
              onChange={(e) => this.handleSetInput(e)}/>
          </div>
        </div>
        <div className="m-top20">
          <div className="add_cat_name_input">
            <label htmlFor="confirm_password" className="c-1">confirm password</label>
            <input 
              type="password" 
              name="confirm_password" 
              placeholder="******"
              value={this.state.confirm_password} 
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
  closeModal
}

export default connect(null, actions)(AddAdminModal);
