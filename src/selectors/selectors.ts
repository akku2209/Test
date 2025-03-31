import { createSelector } from 'reselect';
import { UserRootState } from '../types/userType';

const getUsers = (state: UserRootState) => state.user.users;
const getAgeFilter = (state: UserRootState) => state.user.ageFilter;

export const getFilteredUsers = createSelector(
  [getUsers, getAgeFilter],
  (users, ageFilter) => {
    if (ageFilter === 0) {
      return users;
    }

    return users.filter((user) => user.age === ageFilter);
  }
);
