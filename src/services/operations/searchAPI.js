import { toast } from "react-hot-toast";
import { searchEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const {
  SEARCH_BY_COLLEGE_API,
  USER_SEARCH_API,
  POST_SEARCH_API,
  RANDOM_SEARCH_API,
} = searchEndpoints;

export function searchByCollege(token, data) {
  console.log("DATA", data);
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector({
        method: "PUT",
        url: SEARCH_BY_COLLEGE_API,
        bodyData: { data },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("SEARCH_BY_COLLEGE_API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.success("Update Successful");
        return response.data;
      }
    } catch (error) {
      console.log("SEARCH_BY_COLLEGE_API ERROR", error);
      toast.error(error?.response?.data?.message || "Failed");
    }
    toast.dismiss(toastId);
  };
}

export function randomSearch(token) {
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      
      const response = await apiConnector({
        method: "GET",
        url: RANDOM_SEARCH_API,
        bodyData: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("SEARCH_BY_COLLEGE_API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Update Successful");
      return response.data;
    } catch (error) {
      console.log("SEARCH_BY_COLLEGE_API ERROR", error);
      toast.error(error?.response?.data?.message || "Failed");
    }
    toast.dismiss(toastId);
  };
}
