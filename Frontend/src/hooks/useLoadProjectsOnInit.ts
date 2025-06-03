import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectCurrentManagerId } from "../features/auth/userSlice";
import { setError, setLoading, setProjects } from "../features/Project/projectSlice";
import { useGetProjectsByManagerIdQuery } from "../features/Project/projectApi";

const useLoadProjectsOnInit = () => {
  const dispatch = useDispatch();
  const currentManagerId = useSelector(selectCurrentManagerId);
  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectsByManagerIdQuery(currentManagerId, {
    skip: !currentManagerId, 
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading());
    } else if (projects) {
      dispatch(setProjects(projects));
    } else if (error) {
      dispatch(setError("Failed to load projects"));
    }
  }, [isLoading, projects, error, dispatch]);
};

export default useLoadProjectsOnInit;
