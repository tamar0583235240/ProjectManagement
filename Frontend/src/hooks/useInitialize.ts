// hooks/useInitializeUser.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useCurrentUser from "./useCurrentUser";
import { useGetTopManagerOfEmployeeQuery } from "../features/User/userApi";
import { Role } from "../types/Role";
import { setCurrentManager, setRole } from "../features/auth/userSlice";

const useInitialize = () => {
  const dispatch = useDispatch();
  const storedUser = useCurrentUser();

  const { data: topManagerData } = useGetTopManagerOfEmployeeQuery(
    storedUser._id,
    { skip: storedUser.role === Role.MANAGER || storedUser.role === Role.TEAMLEADER }
  );

  useEffect(() => {
    if (!storedUser) return;

    dispatch(setRole(storedUser.role));

    if (storedUser.role === Role.MANAGER) {
      dispatch(setCurrentManager(storedUser._id));
    } else if (storedUser.role === Role.TEAMLEADER) {
      dispatch(setCurrentManager(storedUser.manager_id));
    } else if (topManagerData) {
      dispatch(setCurrentManager(topManagerData.topManagerId));
    }
  }, [storedUser, topManagerData, dispatch]);
};

export default useInitialize;
