import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './utils.css';

const PageNavigation = ({page_details, current_search, date_func}) => {
  if (typeof page_details !== 'object' || !page_details) {
    page_details = [
      {
        text: 'All',
        url: '/users'
      },
      {
        text: 'new',
        url: '/users'
      },
       {
        text: 'active',
        url: '/users'
      }
    ]
  }
  if (typeof date_func !== 'function') {
    date_func = () => {};
  }
  const [showDateItems, setShowDateItems] = useState(false)

  return (
    <div className="page_navigation_container">
      <div className="page_navigation_contents">
        {
          page_details.map((detail, idx) => (
            <Link
              className={current_search === detail.text.toLowerCase() ? 'page_navigation_links pnl_active' : 'page_navigation_links'}
              to={{
              pathname: `${detail.url}?p=${detail.text.toLowerCase()}`
            }}
            key={idx}
            >
              <div 
              className={current_search === detail.text.toLowerCase() ? 'page_navigation_list_container pgc_active' : 'page_navigation_list_container'} 
              key={idx}>
                <div className="pnd_text">
                  <p className="capitalize">{detail.text}</p>
                </div>
            </div>
            </Link>
          ))
        }
      </div>
      <div className="page_nav_date_container" onClick={() => setShowDateItems(!showDateItems)}>
         <div className="nav_date_content">
           <span>Date</span>
           <span>></span>
         </div>
         {
           showDateItems ? 
           <div data-toggle="date_content_items" className="date_content_items">
           <div>
              <div 
                className="date_link_lists date_links"
                name="date"
                onClick={() => date_func('date')}
                >
                <p>Date</p>
              </div>
              <div 
                className="date_link_lists date_links"
                name="month"
                onClick={() => date_func('month')}
                >
                <p>Month</p>
              </div>
              <div 
                className="date_link_lists date_links"
                name="week"
                onClick={() => date_func('week')}
                >
                <p>Week</p>
              </div>
              <div 
                className="date_link_lists date_links"
                name="day"
                onClick={() => date_func('day')}
              >
                <p>Day</p>
              </div>
           </div>
         </div>
         :
         ''
         }
      </div>
    </div>
  )
}

const DetailsGraph = () => (
  <div>
    sd
  </div>
)
export  {
  PageNavigation,
  DetailsGraph,
}