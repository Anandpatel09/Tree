const HOME = "/home";
const LOGIN= "/";
const PROFILE="/profile/user"
const SETTING="/profile/setting"
const ALL_MEMBERS=`${HOME}/members`


export const ROUTES = {
  HOME,
  LOGIN,
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  DASHBOARD: "/dashboard",
  ADD_MEMBERS: "/add-members",
  PROFILE,
  SETTING,
  ALL_MEMBERS,
};