// import { useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useDispatch, useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";

// import { setCurrentUser } from "../features/auth/userSlice";
// import type { RootState } from "../app/store";
// import type { User } from "../types/User";
// // import { RootState } from "../app/store";

// // interface DecodedUser {
// //   id: string;
// //   userName: string;
// //   role: string;
// //   email: string;
// //   // הוסיפי כאן שדות כפי שמגיעים בטוקן
// // }

// const useLoadUserFromCookie = () => {
//   const dispatch = useDispatch();
//   const [cookies] = useCookies(["token"]);
//   const user = useSelector((state: RootState) => state.user.currentUser);

//   useEffect(() => {
//     if (!user && cookies.token) {
//       try {
//         const decoded = jwtDecode<User>(cookies.token);
//         dispatch(setCurrentUser(decoded));
//         console.log("User loaded from cookie:", decoded);
//       } catch (err) {
//         console.error("Invalid token:", err);
//       }
//     }
//   }, [cookies.token, user, dispatch]);
// };

// export default useLoadUserFromCookie;
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode"; // ודאי שזה לא מוחק
import { setCurrentUser } from "../features/auth/userSlice";
import type { RootState } from "../app/store";
import type { User } from "../types/User";

const useLoadUserFromCookie = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (!user && typeof cookies.token === "string") {
      try {
        const decoded = jwtDecode<User>(cookies.token);
        dispatch(setCurrentUser(decoded));
        console.log("User loaded from cookie:", decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [cookies.token, user, dispatch]);
};

export default useLoadUserFromCookie;
