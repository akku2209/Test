import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserList from '../userList';
import { setAgeFilter } from '../../actions/userActions';

const mockStore = configureStore();

jest.mock('../../selectors/selectors', () => ({
  getFilteredUsers: jest.fn(() => [
    { id: 1, name: 'John', email: 'john@example.com', bio: 'Some bio', age: 25, role: 'User', mob: '1234567890' },
    { id: 2, name: 'Jane', email: 'jane@example.com', bio: 'Some bio', age: 30, role: 'Admin', mob: '9876543210' },
  ]),
}));

describe('UserList Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
    });
  });

  it('renders UserList component with default values', () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(screen.getByText('All Users List')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by Age:')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by Age:')).toHaveValue('all');
  });

  it('updates filter when the dropdown value changes', async () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Filter by Age:'), { target: { value: '30' } });

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(setAgeFilter(30));
    });

    expect(screen.getByLabelText('Filter by Age:')).toHaveValue('30');
  });

});
