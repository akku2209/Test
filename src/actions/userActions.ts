import { SET_AGE_FILTER } from "../types/userType";

export const setAgeFilter = (age: number) => ({
  type: SET_AGE_FILTER,
  payload: age,
});
