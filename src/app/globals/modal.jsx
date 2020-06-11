import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal">
        <div className="main_modal_content">
          <div className="modal_child">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;