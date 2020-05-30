import React from 'react';

import './button.css'

export default ({text, add=false , action}) => (
  <>
    <div className="button_container" 
      onClick={(e) => {
        if (typeof action !== 'function') {
          action = () => {console.log('not clickable')};
        }
        return action(e);
      }}>
      <div className="button_item">
        {
          add ? <span className="add">+</span> : ''
        }
        <button className="button">{text}</button>
      </div>
    </div>
  </>
)