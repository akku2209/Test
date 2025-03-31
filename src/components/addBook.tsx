import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";
import { addBook } from "../actions/bookActions";
import { BookActionTypes } from "../types/bookTypes";
interface AddBookProps {
  onCancel: () => void;
}

const AddBook: React.FC<AddBookProps> = ({ onCancel }) => {
  const dispatch: ThunkDispatch<RootState, null, BookActionTypes> =
    useDispatch();
  const [bookName, setBookName] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const { loading, error, successMsg } = useSelector(
    (state: RootState) => state.auth
  );

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addBook(
        bookName,
        bookDesc,
        "https://i.ibb.co/PWtdmyq/images.jpg",
        bookAuthor,
        2,
        3
      )
    );
    window.location.reload();
  };
  return (
    <div className="popup">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <form className="add-book-form">
        <h2 className="login-text">Add Book</h2>
        <label>
          <b>Book Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          required
        />
        <label>
          <b>Book Description</b>
        </label>
        <input
          type="text"
          placeholder="Enter Book Desc"
          value={bookDesc}
          onChange={(e) => setBookDesc(e.target.value)}
          required
        />
        <label>
          <b>Book Author</b>
        </label>
        <input
          type="text"
          placeholder="Enter Book Author"
          value={bookAuthor}
          onChange={(e) => setBookAuthor(e.target.value)}
          required
        />
        <div className="button-row">
          <button className="add-book-btn" onClick={handleAddBook}>
            {loading ? "Processing..." : "Add Book"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
