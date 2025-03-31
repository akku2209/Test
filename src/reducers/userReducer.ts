import { SET_AGE_FILTER} from "../types/userType";

const initialState = {
  users: [
    { id: 1, name: 'John', age: 25, email: 'john@gmail.com', mob: 9876567899, role: 'Admin'  },
    { id: 2, name: 'Jane', age: 30, email: 'jane@gmail.com', mob: 9876567899, role: 'Admin'  },
    { id: 3, name: 'Bob', age: 25, email: 'bob@gmail.com', mob: 9876567899, role: 'Admin'  },
    { id: 4, name: 'Bob', age: 25, email: 'bob@gmail.com', mob: 9876567899, role: 'Admin'  }
  ],
  ageFilter: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AGE_FILTER:
      return {
        ...state,
        ageFilter: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
