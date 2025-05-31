import { Role } from "../types/Role";
import useCurrentUser from "./useCurrentUser";

const useGetManager = () => {
    const storedUser = useCurrentUser();
    if(storedUser.role === Role.MANAGER)
        return storedUser.organization_id
    if(storedUser.role === Role.TEAMLEADER)
        return storedUser.currentManager 
    return null;
}

export default useGetManager
