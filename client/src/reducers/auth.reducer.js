import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  CLEAR_LOGIN_FORM,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_LOADING,
} from "../actions/types";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_USER_ERROR: {
      console.log(action.payload);
      return {
        ...initialState,
        user: false,
        error: action.payload,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...initialState,
        user: action.payload,
      };
    }
    case USER_LOGOUT_LOADING: {
      return { ...state, isLoading: true };
    }
    case USER_LOGOUT_SUCCESS: {
      return { ...initialState };
    }
    case USER_LOGOUT_ERROR: {
      return { ...state, error: action.payload };
    }
    case CLEAR_LOGIN_FORM: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
