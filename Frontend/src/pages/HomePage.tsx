import useCurrentUser from "../hooks/useCurrentUser";
<<<<<<< HEAD

const HomePage = () => {
  const user = useCurrentUser();
  return ( 
=======
import useGetManager from "../hooks/useGetManager";
import useInitialize from "../hooks/useInitialize";

const HomePage = () => {
  const user = useCurrentUser();
  useInitialize();
  return ( 
    
>>>>>>> Frontend/Projects
    <div>
      <h1>hello {user.user_name}</h1>
    </div>
  )
}

export default HomePage
