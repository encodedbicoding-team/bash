import React from 'react';
import './logo.css'

export default ({ display }) => (
  <>
    <div className="logo_container">
      <div>
        {
          display === 'v' ?
          <div className="logo_vertical">
            <img src={require('../../assets/images/brand-logo-auth.svg')} alt="bash logo vertical" width="100%" height="auto"/>
          </div>
          :
          <div className="logo_horizontal">
            <div>
              <img src={require('../../assets/images/Logo.svg')} alt="bash logo horizontal" width="100%" height="auto"/>
            </div>
            <div>
              <img src={require('../../assets/images/Logo-text.svg')} alt="bash logo horizontal" width="100%" height="auto"/>
            </div>
          </div>
        }
      </div>
    </div>
  </>
)