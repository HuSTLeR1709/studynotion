import { toast } from "react-hot-toast"
import { profileEndpoints, settingsEndpoints } from "../api"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { endpoints } from "../api"
import {apiConnector} from "../apiConnector"
import {setProgress} from "../../slices/loadingBarSlice"
import { logout } from "./authAPI"

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API, null, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}
export async function updatePfp(token,pfp){
    const toastId = toast.loading("Uploading...");
    try {
      const formData = new FormData();
      console.log("pfp",pfp)
      formData.append('pfp',pfp);
      const response = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,{
        Authorisation: `Bearer ${token}`,
      });
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Picture Updated Successfully");
      const imageUrl = response.data.data.image;
      localStorage.setItem("user",JSON.stringify({...JSON.parse(localStorage.getItem("user")),image:imageUrl}));
      console.log(JSON.parse(localStorage.getItem("user")).image);
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  }


  export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, formData, {
          Authorisation: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.updatedUserDetails.image
          ? response.data.updatedUserDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        dispatch(
          setUser({ ...response.data.updatedUserDetails, image: userImage })
        )
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }



  export async function deleteAccount(token,dispatch,navigate){
    const toastId = toast.loading("Deleting...");
    try {
      const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API,null,{
        Authorisation: `Bearer ${token}`,
      });
      console.log("DELETE_ACCOUNT_API API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Account Deleted Successfully");
      dispatch(logout(navigate))
    }
    catch (error) {
      console.log("DELETE_ACCOUNT_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
  }

  export async function updatePassword(token,password){
    const { oldPassword, newPassword, confirmPassword:confirmNewPassword }=password;
    console.log("password",password);
    const toastId = toast.loading("Updating...");
    try {
     const response = await apiConnector("POST", settingsEndpoints.CHANGE_PASSWORD_API,{oldPassword, newPassword, confirmNewPassword},{
        Authorisation: `Bearer ${token}`,
      });
      console.log("UPDATE_PASSWORD_API API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Updated Successfully");
    }
    catch (error) {
      console.log("UPDATE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
  }


  export async function getUserCourses(token,dispatch){
    // const toastId = toast.loading("Loading...");
    dispatch(setProgress);
    let result = []
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await apiConnector(
        "GET",
        profileEndpoints.GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorisation: `Bearer ${token}`,
        }
      )
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    //   console.log(
    //     "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //     response
    //   )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data;
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    dispatch(setProgress(100));
    // toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token){
  const toastId = toast.loading("Loading...")
  let result = [];
  try {
    const response = await apiConnector("GET", profileEndpoints.GET_ALL_INSTRUCTOR_DASHBOARD_DETAILS_API, null, {
      Authorisation: `Bearer ${token}`,
    })
    console.log("GET_ISTRUCTOR_API_RESPONSE",response)
    result = response?.data?.courses;
    
  } catch (error) {
    console.log("GET_INSTRUCTOR_API_ERROR",error)
    toast.error("Could not get instructor data")

  }

  toast.dismiss(toastId)
  return result;
}