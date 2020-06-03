import React from 'react';
import { Link } from 'react-router-dom';
import './subcomponent.css';

const UserMainDetails = ({user_details_array}) => {
    if (!user_details_array) {
      user_details_array = dummy_user_details
    }
  return (
    <div>
      <div>
        <div 
          id="user_main_details_table"
          className="user_main_details_table_container">
            <div id="usmd_table_head" className="usmd_table_head">
              <div className="upper font-small font-primary font-bold">
                <p>name</p>
              </div>
              <div className="upper font-small font-primary font-bold">
                <p>phone #</p>
              </div>
              <div className="upper font-small font-primary font-bold">
                <p>email</p>
              </div>
              <div className="upper font-small font-primary font-bold">
                <p>username</p>
              </div>
              <div className="upper font-small font-primary font-bold">
                <p>status</p>
              </div>
              <div className="d-none">
                <p>view</p>
              </div>
            </div>
            <div className="user_details_contents_main_container">
                {
                  user_details_array.map((ud, idx) => 
                  <UserDetailsContent
                    key={idx}
                    img_url={ud.img_url}
                    id={ud.id}
                    phone={ud.phone}
                    email={ud.email}
                    username={ud.username}
                    status={ud.status}
                    fullname={ud.fullname}
                  />
                 )
                }
            </div>
        </div>
      </div>
    </div>
  )
}



const UserDetailsContent = (
  {
    img_url, 
    phone, 
    email, 
    username, 
    status, 
    fullname,
    id
  }
  ) => (
  <div className="user_details_content_container">
    <Link 
      to={{
        pathname:`/users/d/${id}`
      }}
      className="font-small font-primary td-none usmd_table_body"
    >
      <div className="flex flex-row usmd_img_container">
        <div className="usmd_img_container_img br usmd_detail_item">
          <img width="100%" height="auto" src={img_url} alt="user details"/>
        </div>
        <div className="usmd_img_container_text usmd_detail_item capitalize">
            <p>{fullname}</p>
        </div>
      </div>
      <div className="usmd_detail_item">
        <p>{phone}</p>
      </div>
      <div className="usmd_detail_item">
        <p>{email}</p>
      </div>
      <div className="usmd_detail_item capitalize">
        <p>{username}</p>
      </div>
      <div className="usmd_detail_item capitalize">
        <p>{status}</p>
      </div>
      <div className="usmd_detail_item">
        <i class="lni lni-eye"></i>
      </div>
    </Link>
  </div>
)

const dummy_user_details = [
  {
    id: 1,
    img_url: '',
    phone: '23234334',
    email: 'tester@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'john doe'
  },
  {
    id: 2,
    img_url: '',
    phone: '0023234334',
    email: 'tester2@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'janet doe'
  },
  {
    id: 3,
    img_url: '',
    phone: '23203234334',
    email: 'testing@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'jeffery doe'
  },
  {
    id: 1,
    img_url: '',
    phone: '23234334',
    email: 'tester@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'john doe'
  },
  {
    id: 2,
    img_url: '',
    phone: '0023234334',
    email: 'tester2@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'janet doe'
  },
  {
    id: 3,
    img_url: '',
    phone: '23203234334',
    email: 'testing@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'jeffery doe'
  },
  {
    id: 1,
    img_url: '',
    phone: '23234334',
    email: 'tester@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'john doe'
  },
  {
    id: 2,
    img_url: '',
    phone: '0023234334',
    email: 'tester2@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'janet doe'
  },
  {
    id: 3,
    img_url: '',
    phone: '23203234334',
    email: 'testing@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'jeffery doe'
  },
  {
    id: 1,
    img_url: '',
    phone: '23234334',
    email: 'tester@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'john doe'
  },
  {
    id: 2,
    img_url: '',
    phone: '0023234334',
    email: 'tester2@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'janet doe'
  },
  {
    id: 3,
    img_url: '',
    phone: '23203234334',
    email: 'testing@gmail.com',
    username: 'limbo',
    status: 'verified',
    fullname: 'jeffery doe'
  }
]



export {
  UserMainDetails,
  UserDetailsContent
}
