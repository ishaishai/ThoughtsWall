import axios from "axios";
import {
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOG_OUT,
  LOADING,
  CLEAR_REGISTER_FORM,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_LOADING });
  try {
    const response = await axios.get("/api/current_user");

    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: FETCH_USER_LOADING });

  try {
    //const response = await axios.post('/api/login', user);
    //dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, payload: error.response.data });
  }
};

export const register = (user) => async (dispatch) => {
  console.log(user);
  dispatch({ type: CREATE_USER_LOADING, payload: true });
  try {
    await axios.post("/api/auth/register", user);
    dispatch({ type: CREATE_USER_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_USER_ERROR, payload: error.response.data.msg });
  }
};

export const clearRegister = () => async (dispatch) => {
  dispatch({ type: CLEAR_REGISTER_FORM });
};
