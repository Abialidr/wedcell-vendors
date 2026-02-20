import { createSlice } from "@reduxjs/toolkit";
export const appEssentials = createSlice({
  name: "appEssentials",
  initialState: {
    location: "",
    user: {},
    student: {},
    loginRoute: "",
  },
  reducers: {
    user: (state, action) => {
      state.user = action.payload;
    },
    loginRoute: (state, action) => {
      state.loginRoute = action.payload;
    },
    location: (state, action) => {
      state.location = action.payload;
    },
    student: (state, action) => {
      state.student = action.payload;
    },
  },
});

export const { user, loginRoute, location, student } = appEssentials.actions;
export const selectUser = (state) => state.appEssentials.user;
export const selectLoginRoute = (state) => state.appEssentials.loginRoute;
export const selectLocation = (state) => state.appEssentials.location;
export const selectStudent = (state) => state.appEssentials.student;
export default appEssentials.reducer;
