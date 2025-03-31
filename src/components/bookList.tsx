import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";
import { BookActionTypes } from "../types/bookTypes";
import AddBook from "./addBook";
import {fetchBooks, deleteBook, updateBook } from "../actions/bookActions";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const BookList: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, BookActionTypes> =
    useDispatch();
  const {
    entities: books,
    loading,
    error,
  } = useSelector((state: RootState) => state.book);
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAddBookClick = () => {
    setShowAddBookForm(true);
  };

  const handleCancelClick = () => {
    setShowAddBookForm(false);
  };

  const handleDelete = (bookId: string) => {
    dispatch(deleteBook(bookId));
    window.location.reload();
  };

  const handleUpdate = (
    params: any
  ) => {
    dispatch(updateBook(params.data._id, params.data.name, params.data.author, params.data.description));
  };

  const columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name', editable: true, cellStyle:()=>({  border: '1px solid #ccc'})  },
    { headerName: 'Author', field: 'author', editable: true, cellStyle:()=>({  border: '1px solid #ccc'})  },
    { headerName: 'Description', field: 'description', editable: true, cellStyle:()=>({  border: '1px solid #ccc'})  },
    { headerName: 'TotalBooks', field: 'totalBook' },
    {
      headerName: 'Action', field: '_id', cellRenderer: (params: any) => <div><button className="action-column" onClick={() => handleUpdate(params)}>
        Update
      </button></div>
    },
    {
      headerName: 'Action', field: '_id', cellRenderer: (params: any) => <div><button className="action-column-delete" onClick={() => handleDelete(params.data._id)}>
        Delete
      </button></div>
    }
  ];

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter : true
  }), []);


  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button className="book-add-btn" onClick={handleAddBookClick}>
        AddBook
      </button>
      {showAddBookForm ? (
        <AddBook onCancel={handleCancelClick} />
      ) :
        <div
          className="ag-theme-alpine"
          style={{
            height: '233px',
            width: '88%',
            marginTop: '20px',
            marginLeft: '6rem'
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={Object.values(books)}
            pagination = {true}
            suppressRowVirtualisation={true}
          />
        </div>
      }
    </div>
  );
};

export default BookList;
