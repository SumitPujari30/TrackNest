import { useContext, useEffect } from "react";
import axiosInstance  from "../utils/axiosInstance";
import { UserContext } from "../context/userContext"
import { API_PATHS } from "../utils/apiPath";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export const useUserAuth = () => {
  const navigate = useNavigate();
  const {user, updateUser, clearUser } = useContext(UserContext);
  
  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user Info",error);
        if (isMounted) {
          clearUser();
          navigate("/login");
          toast.error("Session expired. Please login again.");
        }
      }
    }
    
    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser,navigate]);
};
    

