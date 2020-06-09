import React from 'react';

const TransMainDetail = (
  {
    image_url,
     amt,
     type,
     id,
     first_name,
     last_name,
     date,
  }
  ) => {
    if (!image_url) {
      image_url = require('../../../assets/images/random_user.jpg')
    }
  return (
    <div className="all-trans-body all-trans-grid">
      <div className="flex flex-row flex-center">
        <div className="details_main_image_container">
          <img src={image_url} width="100%" height="auto" alt="user logo"/>
        </div>
        <div className="trans_user_names">
          <p className="font-bold c-1 font-medium capitalize">{first_name}</p>
          <p className="font-small c-1 capitalize">{last_name}</p>
        </div>
      </div>
      <div className="flex flex-col flex-center"> 
        <div className={type === 'deposit' ? 'user_trans_container c-dep' : 'user_trans_container c-with'}>
            <p>{type}</p>
        </div>
      </div>
      <div className="flex flex-col flex-center">
        <div className="user_trans_amount">
            <p>₦{amt}</p>
        </div>
      </div>
      <div className="flex flex-col flex-center">
        <div className="user_trans_date">
          <p>{date}</p>
        </div>
      </div>
      <div className="flex flex-col flex-center">
        <div className="flex flex-row pr_eye j-space-between">
          <div className="printer-btn">
            <i className="lni lni-printer"></i>
          </div>
          <div className="show-btn">
            <i className="lni lni-eye"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export {
  TransMainDetail
}