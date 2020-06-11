import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.css';

export default ({image_class, text, url, active = false, image_color}) => {
  return (
    <Link
      to={{
        pathname: `/${url}`,
        state: { fromDashboard: true }
      }}
      className="sidenav_link"
    >
        <div className="sidenav_container">
        <div className="sidenav_content_container">
            <div className={active ? 'side_nav_text active' : 'side_nav_text'}>
                <i className={active ? `${image_class} image_active` : `${image_class} image_non_active`} 
                  style={active ? {color: `${image_color}`} : {color: 'inherit'}}></i>
                <p>{text}</p>
            </div>
            <div>
            <div className={active ? "dot_animate dot" : "dot_animate dot-zero"}></div>
            </div>
        </div>
      </div>
    </Link>
  )
}