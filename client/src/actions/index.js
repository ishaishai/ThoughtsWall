import axios from "axios";
import {
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_LOADING,
  CLEAR_REGISTER_FORM,
  CLEAR_LOGIN_FORM,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_LOADING });
  try {
    const response = await axios.get("/api/auth/current_user");

    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: FETCH_USER_LOADING });
  console.log(user);
  try {
    const response = await axios.post("/api/auth/sign-in", user);
    console.log(response.data);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.userDetails });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: FETCH_USER_ERROR, payload: error.response.data.msg });
  }
};

export const register = (user) => async (dispatch) => {
  console.log(user);
  dispatch({ type: CREATE_USER_LOADING, payload: true });
  try {
    await axios.post("/api/auth/register", user);
    dispatch({ type: CREATE_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: CREATE_USER_ERROR, payload: error.response.data.msg });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_LOADING, payload: true });
  try {
    await axios.get("/api/auth/logout");
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_ERROR, payload: error.response.data.msg });
  }
};

export const clearRegister = () => async (dispatch) => {
  dispatch({ type: CLEAR_REGISTER_FORM });
};

export const clearLogin = () => async (dispatch) => {
  dispatch({ type: CLEAR_LOGIN_FORM });
};
