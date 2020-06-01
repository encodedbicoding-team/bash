import React from 'react';

const DetailsInfo = (
  {
    font_size, 
    color,
    border_right = true,
    title,
    figure,
    w
  }
  ) => {
    if (!font_size) {
      font_size = '23px'
    }
    if (!color) {
      color = '#505560';
    }
    if (!w) {
      w = '90px'
    }
  return (
    <div 
      className={border_right ? 'details_border_right details_info_container' : 'details_info_container'}
      style={{width: w }}
      >
        <p className="details_info_title upper">{title}</p>
        <p 
          style={{fontSize: font_size, color: color}}
        >{figure}</p>
    </div>
  )
}
export {
  DetailsInfo
}