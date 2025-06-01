import useCurrentUser from "../hooks/useCurrentUser";
import useGetManager from "../hooks/useGetManager";
import useInitialize from "../hooks/useInitialize";

const HomePage = () => {
  const user = useCurrentUser();
  useInitialize();
  return ( 
    
    <div>
      <h1>hello {user.user_name}</h1>
    </div>
  )
}

export default HomePage
