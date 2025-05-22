
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../features/auth/userSlice";
import type { User } from "../types/User";
import { jwtDecode} from 'jwt-decode';

const useLoadUserFromCookie = () => {
  // const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  // const user = useSelector(selectCurrentUser);
  // console.log("Current user:", user);  // הדפסת פרטי המשתמש
  const user =localStorage.getItem("currentUser");
  console.log("Current user from localStorage:", user);  // הדפסת פרטי המשתמש
  
  useEffect(() => {
    console.log("Checking for user in cookie...");
    console.log("Cookie token:", cookies.token);
    
    if (!user && typeof cookies.token === "string") {
      console.log("Token found in cookie:", cookies.token);
      try {
        const decoded = jwtDecode<User>(cookies.token);
        console.log("Decoded JWT:", decoded);
        localStorage.setItem("currentUser", JSON.stringify(decoded)); 
        // dispatch(setCurrentUser(decoded));
        console.log("User loaded from cookie:", decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [cookies.token, user,]);
};

export default useLoadUserFromCookie;
