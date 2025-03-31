import {
  BookActionTypes,
  BookState,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
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

const initialState: BookState = {
  entities: {},
  ids: [],
  loading: false,
  error: "",
  successMsg: "",
};

const bookReducer = (
  state = initialState,
  action: BookActionTypes
): BookState => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: "" };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: { ...state.entities, ...action.payload.books },
        ids: Object.keys(action.payload.books),
        error: "",
      };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_BOOK_REQUEST:
      return { ...state, loading: true, error: "" };
    case ADD_BOOK_SUCCESS:
      const newBook = action.payload.book;
      return {
        ...state,
        loading: false,
        entities: { ...state.entities, [newBook._id]: newBook },
        ids: [...state.ids, newBook._id],
        error: "",
        successMsg: action.payload.successMsg,
      };
    case ADD_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_BOOK_REQUEST:
      return { ...state, loading: true, error: "" };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        successMsg: action.payload.successMsg,
      };
    case DELETE_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_BOOK_REQUEST:
      return { ...state, loading: true, error: "" };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        successMsg: action.payload.successMsg,
      };
    case UPDATE_BOOK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bookReducer;
