import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  Book,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_REQUEST,
  ADD_BOOK_FAILURE,
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
} from "../types/bookTypes";

export const fetchBooksSuccess = (books: Book[]) => {
  const normalizedBooks = books.reduce(
    (acc: Record<string, Book>, book: Book) => ({
      ...acc,
      [book._id]: book,
    }),
    {}
  );

  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: { books: normalizedBooks },
  };
};

export const fetchBooks =
  ()=>
    async (dispatch : any) => {
      dispatch({type: FETCH_BOOKS_REQUEST});

      try {
        const response = await fetch("http://localhost:3002/fetchAllBook", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        dispatch(fetchBooksSuccess(data.data));
      } catch (error) {
        dispatch({
          type: FETCH_BOOKS_FAILURE,
          payload: "Failed To fetch books",
        });
      }
    };

export const addBook =
  (
    name: string,
    description: string,
    picture: string,
    author: string,
    totalBooks: number,
    issueForDay: number
  ) =>
    async (dispatch : any) => {
      dispatch({type: ADD_BOOK_REQUEST});
      try {
        const response = await fetch("http://localhost:3002/createBook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, description, picture, totalBooks, issueForDay, author })
        });
        const data = await response.json();
        dispatch({
          type: ADD_BOOK_SUCCESS,
          payload: { book : data.data, successMsg: data.data.msg },
        })
      } catch (error) {
        dispatch({
          type: ADD_BOOK_FAILURE,
          payload: "Add Book failed. Please check your info.",
        });
      }
    };

export const deleteBook =
  (id: string) =>
    async (dispatch : any) => {
      dispatch({ type: DELETE_BOOK_REQUEST});

      try {
        const response = await fetch("http://localhost:3002/deleteBook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id })
        });
        const data = await response.json();
        dispatch({
          type: DELETE_BOOK_SUCCESS,
          payload: { successMsg : data.data.msg },
        });
      } catch (error) {
        dispatch({
          type: DELETE_BOOK_FAILURE,
          payload: "Add Book failed. Please check your info.",
        });
      }
    };

export const updateBook =
  (
    id: string,
    name: string,
    author: string,
    description: string
  ) =>
    async (dispatch : any) => {
      dispatch({ type: UPDATE_BOOK_REQUEST });

      try {
        const response = await fetch("http://localhost:3002/updateBook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id, name, author, description })
        });
        const data = await response.json();
        dispatch({
          type: UPDATE_BOOK_SUCCESS,
          payload: { successMsg: data.data.msg }
        })
      } catch (error) {
        dispatch({ type: UPDATE_BOOK_FAILURE, payload: "Update Book failed. Please check your info."})
      }
    };
