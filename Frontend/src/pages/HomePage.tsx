import useCurrentUser from "../hooks/useCurrentUser";
<<<<<<< HEAD
import useGetManager from "../hooks/useGetManager";
import useInitialize from "../hooks/useInitialize";

const HomePage = () => {
  const user = useCurrentUser();
  useInitialize();
  return ( 
    
=======

const HomePage = () => {
  const user = useCurrentUser();
  return ( 
>>>>>>> cd97ccf5a0bdab67928cc5508c8ea56f6be13008
    <div>
      <h1>hello {user.user_name}</h1>
    </div>
  )
}

export default HomePage
