export const SET_AGE_FILTER = 'SET_AGE_FILTER';

export interface User {
    id: number;
    name: string;
    age: number;
    email:string;
    mob : number;
    role : string;
    bio : string;
}

export interface UserRootState {
    user: {
        users: User[];
        ageFilter: number | null;
    };
}