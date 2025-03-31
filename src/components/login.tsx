import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { loginUser } from "../actions/authActions";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

type MyThunkDispatch = ThunkDispatch<RootState, null, Action<string>>;

export const useMyDispatch = () => useDispatch<MyThunkDispatch>();

const Login: React.FC = () => {
  const dispatch = useMyDispatch();
  const navigate = useNavigate();
  const { loading, error, successMsg } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(loading, error, successMsg)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (successMsg) {
      navigate("/dashboard");
    }
  }, [successMsg, navigate]);

  return (
    <form className="login-form">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <h2 className="login-text">LOGIN</h2>
      <label>
        <b>Email</b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />{" "}
      <button onClick={handleLogin} disabled={loading} >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
