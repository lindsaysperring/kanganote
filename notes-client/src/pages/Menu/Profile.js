import React, {useContext} from 'react';

import { userContext } from "../../Routing";

import './Profile.css'

function Profile() {

  const { userData } = useContext(userContext);

  return (
    <div className='profile'>
      {userData.isLoggedIn && (
        <>
          <h1 className='name'>{userData.user.name}!</h1>
          <h2 className='email'>Email: {userData.user.email}</h2>
      </>
      )}
    </div>
  );
}

export default Profile;