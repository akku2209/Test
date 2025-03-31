import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types/authTypes";

export const logoutUser = () => async (dispatch: any) => {
  localStorage.removeItem("token");
  dispatch({type: LOGOUT});
};

export const loginUser = (email: string, password: string) => async (dispatch: any) => {
    dispatch({type: LOGIN_REQUEST});

    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.msg);
      } else {
        localStorage.setItem("token", data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token: data.token, successMsg: data.msg },
        });
      }
    } catch (error) {
      dispatch({type: LOGIN_FAILURE, payload: "Login Failed"});
    }
  };
