import React from 'react';
import './logo.css'

export default ({ display }) => (
  <>
    <div className="logo_container">
      <div className={
          display === 'v' ?
            "logo_vertical" : 
            "logo_horizontal"}>
        <div>b</div>
        <div>bash</div>
      </div>
    </div>
  </>
)