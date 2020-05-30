import React, { Component } from 'react';
import { withRouter } from 'react-router';
import LogoComponent from '../Logo';
import ButtonComponent from '../Buttons';
import './login.css';

class LoginComponent extends Component {
  state = {
    email_data: '',
    password_data: '',
  }

  handleInputChange(e) {
    const key = e.target.name;
    const value = e.target.value
    this.setState({[key]: value})
  }
  render() {
    return (
      <div className="login_page">
        <div className="login_contents_container">
          <div className="login_items_container">
            <div className="logo_vertical_container">
              <LogoComponent display='v'/>
            </div>
            <div className="login_inputs_container">
              <div className="login_inputs_contents">
                <p className="label">Email</p>
                <input type="text"
                 placeholder="Email"
                 name="email_data"
                 value={this.state.email_data}
                 onChange={(e) => this.handleInputChange(e)}
                 />
              </div>
              <div className="login_inputs_contents">
                <p className="label">Password</p>
                <input type="password"
                 placeholder="Password"
                 name="password_data"
                 value={this.state.password_data}
                 onChange={(e) => this.handleInputChange(e)}
                 />
              </div>
            </div>
            <div className="login_button_container">
              <ButtonComponent
                text="login"
                action={(e) => this.props.history.push('/dashboard')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginComponent);