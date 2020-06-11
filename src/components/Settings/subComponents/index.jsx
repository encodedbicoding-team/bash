import React from 'react';

const AdminUserDetail = (
  {
    image_url,
    email,
    role,
    first_name,
    last_name,
    id
  }
  ) => {
    if (!image_url) {
      image_url = require('../../../assets/images/random_user.jpg')
    }

    return (
      <div className="all_admin_grid all-admin-body">
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
            <div className="admin_user_email">
              <p>{email}</p>
            </div>
          </div>
          <div className="flex flex-col flex-center">
            <div className="admin_user_role">
              <p>{role}</p>
            </div>
          </div>
          <div className="flex flex-col flex-center">
            <div className="flex flex-row pr_eye j-space-between">
              <div className="edit-btn">
                <i className="lni lni-pencil"></i>
              </div>
              <div className="delete-btn">
                <i className="lni lni-trash"></i>
              </div>
            </div>
          </div>
      </div>
    )
}
export {
  AdminUserDetail
}