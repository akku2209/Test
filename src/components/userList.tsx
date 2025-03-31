import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAgeFilter } from '../actions/userActions';
import { getFilteredUsers } from '../selectors/selectors';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);

  const filteredUsers = useSelector(getFilteredUsers);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedAge = selectedValue === 'all' ? null : parseInt(selectedValue, 10);
    setSelectedFilter(selectedAge);
    dispatch(setAgeFilter(Number(selectedAge)));
  };

  useEffect(() => {
    dispatch(setAgeFilter(0));
  }, [dispatch]);

  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Users',
      children: [
        {
          headerName: 'Name',
          field: 'name',
          filter: 'agTextColumnFilter',
        },
      ],
    },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Role', field: 'role' },
    { headerName: 'Contact No.', field: 'mob' },
  ];
  

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    enableRowGroup: true,
  }), []);

  return (
    <div>
      <h2 style={{ marginLeft: '1rem' }}>All Users List</h2>
      <label htmlFor="filterDropdown" className='filterLabel'>Filter by Age: </label>
      <select
        id="filterDropdown"
        onChange={handleFilterChange}
        value={selectedFilter === null ? 'all' : selectedFilter.toString()}
      >
        <option value="all">All</option>
        <option value="25">25</option>
        <option value="30">30</option>
      </select>
      <div
        className="ag-theme-alpine"
        style={{
          height: '400px',
          width: '88%',
          marginTop: '20px',
          marginLeft: '6rem'
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={filteredUsers}
          rowGroupPanelShow="always"
          sideBar={true}
          rowSelection="multiple"
        />
      </div>

    </div>
  );
};

export default UserList;
