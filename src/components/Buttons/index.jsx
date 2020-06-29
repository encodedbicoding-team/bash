import React from 'react';

import './button.css'

export default ({text, add=false , action, width = '72px'}) => (
  <>
    <div className="button_container" style={{width: width}}
      onClick={(e) => {
        if (typeof action !== 'function') {
          action = () => {console.log('not clickable')};
        }
        return action(e);
      }}>
      <div className="button_item">
        {
          add ? <i className="lni lni-plus add"></i> : ''
        }
        <button className="button">{text}</button>
      </div>
    </div>
  </>
)