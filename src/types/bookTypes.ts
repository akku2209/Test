export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";

export const ADD_BOOK_REQUEST = "ADD_BOOK_REQUEST";
export const ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS";
export const ADD_BOOK_FAILURE = "ADD_BOOK_FAILURE";

export const DELETE_BOOK_REQUEST = "DELETE_BOOK_REQUEST";
export const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";
export const DELETE_BOOK_FAILURE = "DELETE_BOOK_FAILURE";

export const UPDATE_BOOK_REQUEST = "UPDATE_BOOK_REQUEST";
export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
export const UPDATE_BOOK_FAILURE = "UPDATE_BOOK_FAILURE";

interface FetchBooksRequest {
  type: typeof FETCH_BOOKS_REQUEST;
}

interface FetchBooksSuccess {
  type: typeof FETCH_BOOKS_SUCCESS;
  payload: {
    books: Record<string, Book>;
  };
}

interface FetchBooksFailure {
  type: typeof FETCH_BOOKS_FAILURE;
  payload: string;
}

interface AddBookRequest {
  type: typeof ADD_BOOK_REQUEST;
}

interface AddBookSuccess {
  type: typeof ADD_BOOK_SUCCESS;
  payload: {
    book: Book;
    successMsg: string;
  };
}

interface AddBookFailure {
  type: typeof ADD_BOOK_FAILURE;
  payload: string;
}

interface UpdateBookRequest {
  type: typeof UPDATE_BOOK_REQUEST;
}

interface UpdateBookSuccess {
  type: typeof UPDATE_BOOK_SUCCESS;
  payload: {
    successMsg: string;
  };
}

interface UpdateBookFailure {
  type: typeof UPDATE_BOOK_FAILURE;
  payload: string;
}

interface DeleteBookRequest {
  type: typeof DELETE_BOOK_REQUEST;
}

interface DeleteBookSuccess {
  type: typeof DELETE_BOOK_SUCCESS;
  payload: {
    successMsg: string;
  };
}

interface DeleteBookFailure {
  type: typeof DELETE_BOOK_FAILURE;
  payload: string;
}

export type BookActionTypes =
  | FetchBooksRequest
  | FetchBooksSuccess
  | FetchBooksFailure
  | AddBookRequest
  | AddBookSuccess
  | AddBookFailure
  | DeleteBookRequest
  | DeleteBookSuccess
  | DeleteBookFailure
  | UpdateBookRequest
  | UpdateBookSuccess
  | UpdateBookFailure;

export interface Book {
  _id: string;
  name: string;
  author: string;
  description: string;
  totalBook: number;
}

export interface BookState {
  entities: Record<string, Book>; // Use Record<string, Book> for normalized data
  ids: string[];
  loading: boolean;
  error: string;
  successMsg: string;
}
