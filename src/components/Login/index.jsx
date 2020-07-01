import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LogoComponent from '../Logo';
import ButtonComponent from '../Buttons';
import { login }  from '../../features/authentication/login';
import { formValidatorV1 } from '../../encodedbicoding';
import Swal from 'sweetalert2';

import './login.css';

class LoginComponent extends Component {
  state = {
    email_data: '',
    password_data: '',
    errors: [],
    showFormErrors: false,
  }
  componentDidMount() {
    // check alredy signed in
    this.handleCheckLoggedIn();

  }
  handleCheckLoggedIn() {
    let isAuthenticated = sessionStorage.getItem('__bash__admin__<3_EBC');
    if (isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  handleResetState() {
    this.setState({
      email_data: '',
      password_data: '',
    })
  }
  handleValidateForm() {
    const formFields = [
      {
        field: 'email_data',
        error: 'Email is required. Cannot be empty'
      },
      {
        field: 'password_data',
        error: 'Password is required. Cannot be empty'
      }
    ]
    return formValidatorV1(this.state, formFields);
  }

  async handleLogin(e) {
    e.preventDefault();
    const errorObj = this.handleValidateForm();
    if (errorObj.isErrors) {
      this.setState({ errors: errorObj.errors, showFormErrors: true});
      setTimeout(() => {
      this.setState({ errors: [], showFormErrors: false});
      }, 3000)
      return;
    }

    const form = {
      email: this.state.email_data,
      password: this.state.password_data
    }; 

    try {
      const response = await this.props.login(form);
      const  { auth: { access_token }} = response.data;
      sessionStorage.setItem('<3_EBC__bash__ad__dash_data<3_EBC',JSON.stringify(response.data) );
      sessionStorage.setItem('__bash__admin__<3_EBC', access_token);
      this.props.history.push('/dashboard');
    } catch (error) {
      let e = error.responseJSON;
      if(typeof e.data !== 'string') {
        if (!Array.isArray(e.data)) {
          let keys = Object.keys(e.data);
          let errorText = '';
          for (let i=0; i<keys.length; i++) {
            errorText += `${keys[i]}: ${e.data[keys[i]]}`
          }
          e=errorText;
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e,
        onClose: () => {
          this.handleResetState()
        }
      })
    }
    return;
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
                <input 
                 type="text"
                 required
                 placeholder="Email"
                 name="email_data"
                 value={this.state.email_data}
                 onChange={(e) => this.handleInputChange(e)}
                 />
              </div>
              {
                this.state.showFormErrors ?
                this.state.errors.find((item) => item.item === 'email_data') ?
                <div className="form-error" id="login_email_error">
                  <p>{
                    this.state.errors.find((item) => item.item === 'email_data').error
                    }</p>
                </div>
                :
                ''
                :
                ''
              }
              <div className="login_inputs_contents">
                <p className="label">Password</p>
                <input 
                 type="password"
                 required
                 placeholder="Password"
                 name="password_data"
                 value={this.state.password_data}
                 onChange={(e) => this.handleInputChange(e)}
                 />
              </div>
              {
                this.state.showFormErrors ?
                this.state.errors.find((item) => item.item === 'password_data') ?
                <div className="form-error" id="login_email_error">
                  <p>{
                    this.state.errors.find((item) => item.item === 'password_data').error
                    }</p>
                </div>
                :
                ''
                :
                ''
              }
            </div>
            <div className="login_button_container">
              <ButtonComponent
                text={this.props.requestingLogin ? 'loading...' : 'login'}
                action={(e) => this.handleLogin(e)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const actions = {
  login,
}
const mapStateToProps = state => ({
  requestingLogin: state.login.requestingLogin,
  loginSuccess: state.login.loginSuccess,
  loginFailure: state.login.loginFailure,
  formError: state.login.errorResponse,
})

export default connect(mapStateToProps, actions)(withRouter(LoginComponent));