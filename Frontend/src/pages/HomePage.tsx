import useCurrentUser from "../hooks/useCurrentUser";
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

export default HomePage;

