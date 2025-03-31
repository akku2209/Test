import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../types/authTypes";

const authReducer = (state: { token: string | null, loading: boolean, error : string | null, successMsg : string | null } = { token: null, loading : false, error:null, successMsg : null }, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: "", successMsg: "" };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        successMsg: action.payload.successMsg,
        error: "",
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMsg: "",
      };
    default:
      return state;
  }
};

export default authReducer;
