const useCurrentUser = () => {
<<<<<<< HEAD
  const userStr = localStorage.getItem("currentUser");
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export default useCurrentUser;
=======
    const userStr = localStorage.getItem("currentUser");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };
  
  export default useCurrentUser;
  
>>>>>>> cd97ccf5a0bdab67928cc5508c8ea56f6be13008
