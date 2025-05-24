import { useSelector } from "react-redux";
import { selectCurrentManagerId } from "../features/auth/userSlice";
import { useDispatch } from "react-redux";
import { setError, setLoading, setProjects } from "../features/Projects/projectSlice";
import { projectApi, useGetProjectsByManagerIdQuery } from "../features/Projects/projectApi";

const useLoadProjectsOnInit = async () => {
    const currentManagerId = useSelector(selectCurrentManagerId)
    console.log('currentManagerId', currentManagerId);
    const dispatch = useDispatch()

    dispatch(setLoading())
    try {

        // const response = await dispatch(
        //     useGetProjectsByManagerIdQuery(currentManagerId as string)
        // ).unwrap(); // unwrap כדי לקבל רק את ה-data

        // dispatch(setProjects(response));
        const result = await dispatch(
          projectApi.endpoints.getProjectsByManagerId.initiate(currentManagerId)
        ).unwrap(); // unwrap מחלץ את הנתונים (data) או זורק שגיאה

        dispatch(setProjects(result));

    } catch (error) {
        dispatch(setError('Failed to load projects'))
    }

}

export default useLoadProjectsOnInit
