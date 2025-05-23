import { useCurrentUser } from "../hooks/useCurrentUser";


const HomePage = () => {
  const user = useCurrentUser();
  return ( 
    <div>
      <h1>hello {user.user_name}</h1>
    </div>
  )
}

export default HomePage
