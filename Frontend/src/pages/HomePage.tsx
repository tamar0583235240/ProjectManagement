
import useLoadUserFromCookie from '../hooks/useLoadUserFromCookie';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/userSlice';
import React from 'react';

const HomePage = () => {
  
  useLoadUserFromCookie();
  const user = useSelector(selectCurrentUser);
  return (
    <div>
      <h1>hello {user?.user_name}</h1>
    </div>
  )
}

export default HomePage
