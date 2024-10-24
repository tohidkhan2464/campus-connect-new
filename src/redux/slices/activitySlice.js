import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  usersData: null,
  searchData: localStorage.getItem("searchData")
    ? JSON.parse(localStorage.getItem("searchData"))
    : [],
};

const activitySlice = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    setUsersData(state, value) {
      state.usersData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSearchData(state, value) {
      state.searchData = value.payload;
    },
  },
});

export const { setUsersData, setLoading, setSearchData } =
  activitySlice.actions;
export default activitySlice.reducer;
