import {
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  chats: null,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...initialState,
        isLoading: false,
      };

    case SEND_MESSAGE_ERROR:
      return {
        ...initialState,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
