import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../features/globals/Modal';
import Button from '../Buttons';
import './modals.css'

class CategoryModal extends Component {

  state = {
    imageUrlToUpload: '',
    category_name: '',
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
          <p className="modal_title">add category</p>
          <div className="modal_close" onClick={() => this.props.closeModal()} title="close">
            <i className="lni lni-close"></i>
          </div>
        </div>
        <div className="m-top20">
          <div className="flex flex-row flex-center w-100">
              <input 
                type="file"  
                className="display-none"
                id="categoryFileUpload"
                accept="image/*"
                onChange={(e) => this.handleFileUpload(e.nativeEvent, 'categoryFileUpload')}
                />

              <div className="w-100 file_chooser_img" onClick={() => document.querySelector('#categoryFileUpload').click()}>
                  {
                    this.state.imageUrlToUpload ?
                    <div>image uploaded</div>
                    :
                    <div className="empty_img">
                      <i className="lni lni-plus c-1"></i>
                    </div>
                  }
                  <p className="c-2">Upload icon</p>
              </div>
          </div>
        </div>
        <div className="m-top20">
            <div className="add_cat_name_input">
                <label htmlFor="category_name" className="c-1">category name</label>
                <input 
                  type="text" 
                  name="category_name" 
                  placeholder="e.g Jason"
                  value={this.state.category_name} 
                  onChange={(e) => this.handleSetInput(e)}/>
            </div>
        </div>
        <div className="m-top20">
          <input
            id="questionFileUpload"
            type="file"
            accept=".exe"
            className="display-none"
            onChange={(e) => this.handleFileUpload(e.nativeEvent, 'questionFileUpload')}
          />
          <div 
            className="flex flex-row flex-center question_file_uploader br"
            onClick={() => document.querySelector('#questionFileUpload').click()}
            >
              <div className="c-1">
                <i className="lni lni-upload"></i>
              </div>
              <div className="upload_text_c">
                <p className="upload_a">Upload questions</p>
                <p className="c-1 upload_b">Only Microsoft excel file (.exe) is accepted</p>
              </div>
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

export default connect(null, actions)(CategoryModal)
