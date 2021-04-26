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
  FETCH_THOUGTHS_LOADING,
  FETCH_THOUGTHS_SUCCESS,
  FETCH_THOUGTHS_FAILED,
  DELETE_THOUGHT_LOADING,
  DELETE_THOUGHT_SUCCESS,
  DELETE_THOUGHT_FAILED,
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_ERROR,
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

export const login = (user, history) => async (dispatch) => {
  dispatch({ type: FETCH_USER_LOADING });

  try {
    const response = await axios.post("/api/auth/sign-in", user);

    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data.userDetails });
    history.push("/");
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, payload: error.response.data.msg });
  }
};

export const register = (user) => async (dispatch) => {
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

export const getThoughts = () => async (dispatch) => {
  dispatch({ type: FETCH_THOUGTHS_LOADING });
  try {
    const response = await axios.get("/api/thoughts/get-all-thoughts");
    dispatch({ type: FETCH_THOUGTHS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_THOUGTHS_FAILED, payload: error.response.data.msg });
  }
};

export const deleteThought = (id) => async (dispatch) => {
  dispatch({ type: DELETE_THOUGHT_LOADING });
  try {
    const response = await axios.delete("/api/thoughts/delete-thought/" + id);
    dispatch({ type: DELETE_THOUGHT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_THOUGHT_FAILED, payload: error.response.data.msg });
  }
};

export const sendMessage = (message) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_LOADING });
  try {
    const response = await axios.post("/api/chats/send-message", message);
  } catch (error) {
    dispatch({ type: SEND_MESSAGE_ERROR, payload: error.response.data.msg });
  }
};
