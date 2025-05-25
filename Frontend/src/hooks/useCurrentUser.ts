const useCurrentUser = () => {
    const userStr = localStorage.getItem("currentUser");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };
  
  export default useCurrentUser;
  