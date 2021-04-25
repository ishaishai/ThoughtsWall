import {
  FETCH_THOUGTHS_SUCCESS,
  FETCH_THOUGTHS_FAILED,
  FETCH_THOUGTHS_LOADING,
  DELETE_THOUGHT_SUCCESS,
  DELETE_THOUGHT_LOADING,
  DELETE_THOUGHT_FAILED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  thoughts: [],
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_THOUGTHS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_THOUGTHS_SUCCESS: {
      return {
        ...initialState,
        thoughts: payload,
        isLoading: false,
      };
    }
    case FETCH_THOUGTHS_FAILED: {
      return {
        ...initialState,
        isLoading: false,
        error: payload,
      };
    }
    case DELETE_THOUGHT_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case DELETE_THOUGHT_SUCCESS: {
      return {
        ...initialState,
        thoughts: state.thoughts.filter((item) => item["_id"] !== payload),
      };
    }
    case DELETE_THOUGHT_FAILED: {
      return {
        ...state,
        error: payload,
      };
    }
    default:
      return state;
  }
};
