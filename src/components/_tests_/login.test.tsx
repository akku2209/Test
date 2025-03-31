import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../login";

const mockStore = configureMockStore();

describe("Login Component", () => {
  it("renders without crashing", () => {
    const store = mockStore({
      auth: { loading: false, error: "", successMsg: "" },
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  });

  it("has empty email and password fields initially", () => {
    const store = mockStore({
      auth: { loading: false, error: "", successMsg: "" },
    });
  
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  
    const emailInput = screen.getByPlaceholderText("Enter Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Enter Password") as HTMLInputElement;
  
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  it("handles email input change", () => {
    const store = mockStore({
      auth: { loading: false, error: "", successMsg: "" },
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Enter Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  it("handles password input change", () => {
    const store = mockStore({
      auth: { loading: false, error: "", successMsg: "" },
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText("Enter Password") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(passwordInput.value).toBe("password123");
  });
  
  it("redirects to /dashboard after successful login", async () => {
    const store = mockStore({
      auth: { loading: false, error: "", successMsg: "Login successful" },
    });
  
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  
    await waitFor(() => {
      expect(screen.getByText("Login successful")).toBeInTheDocument();
    });
  
    expect(window.location.pathname).toBe("/dashboard");
  });
});
