import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";
import { updateBook } from "../actions/bookActions";
import { BookActionTypes } from "../types/bookTypes";

interface UpdateBookProps {
  onCancel: () => void;
  bookData: {
    id: string;
    name: string;
    description: string;
    author: string;
  } | null;
}

const UpdateBook: React.FC<UpdateBookProps> = ({ onCancel, bookData }) => {
  const dispatch: ThunkDispatch<RootState, null, BookActionTypes> =
    useDispatch();
  const [bookName, setBookName] = useState(bookData?.name || "");
  const [bookDesc, setBookDesc] = useState(bookData?.description || "");
  const [bookAuthor, setBookAuthor] = useState(bookData?.author || "");
  const { loading, error, successMsg } = useSelector(
    (state: RootState) => state.auth
  );

  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookData) {
      dispatch(updateBook(bookData.id, bookName, bookAuthor, bookDesc));
      window.location.reload();
    }
  };
  return (
    <div className="popup">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <form className="add-book-form">
        <h2 className="login-text">Update Book</h2>
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
          <button className="add-book-btn" onClick={handleUpdateBook}>
            {loading ? "Processing..." : "Update Book"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
