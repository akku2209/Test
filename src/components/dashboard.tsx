import React, { useState } from "react";
import { useMyDispatch } from "./login";
import { logoutUser } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import BookList from "./bookList";
import UserList from "./userList";

const Dashboard: React.FC = () => {
  const dispatch = useMyDispatch();
  const navigate = useNavigate();
  const [showUserList, setShowUserList] = useState(false);
  const [showBookList, setShowBookList] = useState(true);

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log("Logging out and navigating to home");
    navigate("/");
  };

  const handleUserInfoClick = () => {
    setShowUserList(!showUserList);
    setShowBookList(false);
  };

  const handleBookInfoClick = () => {
    setShowBookList(!showBookList);
    setShowUserList(false);
  };

  return (
    <div>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to the Dashboard!</h1>
        <div className="button-row">
          <button className="book-info-btn" onClick={handleUserInfoClick}>
            UserInfo
          </button>

          <button className="book-info-btn" onClick={handleBookInfoClick}>
            BookInfo
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showUserList ? <UserList /> : ""}
      {showBookList ? <BookList /> : ""}
    </div>
  );
};

export default Dashboard;
