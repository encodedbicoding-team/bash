import React, { Component } from 'react';
import Buttons from '../Buttons';
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
                <div>admin</div>
              }
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsComponent;