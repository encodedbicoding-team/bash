import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../features/globals/Modal';
import Buttons from '../Buttons';
import { DetailsInfo } from '../../utils/utils';
import { AdminUserDetail } from './subComponents';
import './settings.css';

class SettingsComponent extends Component {

  state = {
    settingsPageOption: '',
    bcConversion: 10,
    costOfEntry: 10,
    fiftyFifty: 2,
    addTime: 3,
    timer: 150,
  }
  componentDidMount() {
    this.setState({ settingsPageOption: 'gameRules' })
  }
  handleSetPageOptions(e) {
    let name = e.target.getAttribute('name');
    this.setState({ settingsPageOption: name})
  }

  handleSetRulesGameFormData (e) {
    let name = e.target.getAttribute('name');
    this.setState({[name]: Number(e.target.value)})
  }
  render() {
    return (
      <div className="settings_main_container">
        <div>
            <div className="page_title_cont">
              <p className="page_title">Settings</p>
            </div>
        </div>
        <div className="settings_page_options_container">
          <div className="options_controllers">
            <div 
              className={this.state.settingsPageOption === 'gameRules' ? "option_controller_item option_control_item_active" : "option_controller_item"}
              name="gameRules"
              onClick={(e) => this.handleSetPageOptions(e)}
            >
              Game Rules
            </div>
            <div 
              className={this.state.settingsPageOption === 'adminUsers' ? "option_controller_item option_control_item_active" : "option_controller_item"}
              name="adminUsers"
              onClick={(e) => this.handleSetPageOptions(e)}
              >
              Admin Users
            </div>
          </div>
          <div className="options_body">
              {
                this.state.settingsPageOption === 'gameRules' ?
                <div className="game_rules_container">
                  <div className="game_rules_body">
                    <p className="game_rules_info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="game_rules_form_cont">
                      <div className="gr_form_item">
                        <h3>Bash Currency</h3>
                        <div className="game_rules_form_body">
                          <div className="game_rules_input">
                            <label htmlFor="bcConversion">bc conversion</label>
                            <input type="text" name="bcConversion" value={this.state.bcConversion} onChange={(e) => this.handleSetRulesGameFormData(e)}/>
                          </div>
                          <div className="game_rules_input">
                            <label htmlFor="costOfEntry">cost of entry (bc)</label>
                            <input type="text" name="costOfEntry" value={this.state.costOfEntry} onChange={(e) => this.handleSetRulesGameFormData(e)}/>
                          </div>
                        </div>
                      </div>
                      <div className="gr_form_item">
                        <h3>Lifeline</h3>
                        <div className="game_rules_form_body">
                          <div className="game_rules_input">
                            <label htmlFor="fiftyFifty">50/50 (bc)</label>
                            <input type="text" name="fiftyFifty" value={this.state.fiftyFifty} onChange={(e) => this.handleSetRulesGameFormData(e)}/>
                          </div>
                          <div className="game_rules_input">
                            <label htmlFor="addTime">add time (bc)</label>
                            <input type="text" name="addTime" value={this.state.addTime} onChange={(e) => this.handleSetRulesGameFormData(e)}/>
                          </div>
                        </div>
                      </div>
                      <div className="gr_form_item">
                        <h3>Quiz</h3>
                        <div className="game_rules_form_body">
                          <div className="game_rules_input">
                            <label htmlFor="timer">timer (sec)</label>
                            <input type="text" name="timer" value={this.state.timer} onChange={(e) => this.handleSetRulesGameFormData(e)}/>
                          </div>
                          <div className="d-none"></div>
                        </div>
                      </div>
                      <div className="game_save_btn">
                        <Buttons
                          text="save changes"
                          action={() => console.log('save changes')}
                          width={'25%'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="w-100 admin_users_main_container">
                  <div className="flex flex-row j-space-between">
                      <div className="flex flex-row">
                        <DetailsInfo
                          title="total"
                          figure="19"
                          width="90px"
                        />
                        <DetailsInfo
                          title="role one"
                          figure="8"
                          width="90px"
                        />
                        <DetailsInfo
                          title="role two"
                          figure="3"
                          width="100px"
                          border_right={false}
                        />
                      </div>
                      <div>
                        <Buttons 
                          add={true} 
                          text="add admin" 
                          width="100%"
                          action={() => this.props.showModal('add_admin')}
                          />
                      </div>
                  </div>
                  <div className="m-top20">
                    <div className="all_admin_grid all_admin_header">
                        <div className="flex flex-col flex-center">
                          <p className="upper font-small c-1 font-bold">name</p>
                        </div>
                        <div className="flex flex-col flex-center">
                          <p className="upper font-small c-1 font-bold">name</p>
                        </div>
                        <div className="flex flex-col flex-center">
                          <p className="upper font-small c-1 font-bold">name</p>
                        </div>
                        <div className="op-0">edit-delete-view</div>
                    </div>
                    <div className="all_admin_main_body">
                        {
                          dummy_admin.map((admin, idx) => 
                            <AdminUserDetail
                              key={idx}
                              image_url={admin.image_url}
                              email={admin.email}
                              role={admin.role}
                              first_name={admin.first_name}
                              last_name={admin.last_name}
                            />
                          )
                        }
                    </div>
                  </div>
                </div>
              }
          </div>
        </div>
      </div>
    )
  }
}
const dummy_admin = [
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    image_url: '',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  }
]
const actions = {
  showModal,
}

export default connect(null, actions)(SettingsComponent);