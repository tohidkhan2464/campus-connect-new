import { toast } from "react-hot-toast";
// import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { notifications } from "../api";
// import { broadcast } from "../api";
// import { messages } from "../api";
// import { logout } from "./authAPI";

// const { GET_BROADCASTS, SEND_BROADCASTS } = broadcast;
// const { GET_BROADCASTS, SEND_BROADCASTS } = message;
const {
  GET_ACTIVITY,
  // GET_NOTIFICATIONS,
  SET_ACTIVITY_SEEN,
} = notifications;

// getActivity
export const getActivity = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ACTIVITY,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("GET_ACTIVITY API response............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Activity");
    }
    result = response?.data?.data;
  } catch (error) {
    // console.log("GET_ACTIVITY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const handleActivitySeen = async (activityId, token) => {
  // console.log("Handle activityId.....", activityId, token);
  // const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector({
      method: "POST",
      url: SET_ACTIVITY_SEEN,
      bodyData: { activityId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("SET_ACTIVITY_SEEN API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Handle activity");
    }
  } catch (error) {
    // console.log("SET_ACTIVITY_SEEN ERROR............", error);
    toast.error(error.message);
  }
  // toast.dismiss(toastId);
  return;
};
