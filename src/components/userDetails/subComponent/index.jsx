import React from 'react';

const UserTransDetailsBody = ({amt, date, id, type}) => {
  return (
    <div className="u_details_trans_table_body">
      <div>
        <p 
          className={type.match(/deposit/i) ? 'capitalize dep-cont br' : 'capitalize wid-cont br'}
          >
          {type}
        </p>
      </div>
      <div>
        <p 
          className="upper"
          style={{color: '#5AA9FA'}}>
            {amt}
        </p>
      </div>
      <div className="user_trans_date">
        <p className="upper">{date}</p>
      </div>
      <div className="flex flex-row pr_eye j-space-between">
        <div className="printer-btn">
          <i className="lni lni-printer"></i>
        </div>
        <div className="show-btn">
          <i className="lni lni-eye"></i>
        </div>
      </div>
    </div>
  )
}
export {
  UserTransDetailsBody
}