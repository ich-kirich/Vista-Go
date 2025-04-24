import { IAction, IUser } from "../../types/types";
import { Users } from "../../libs/enums";

interface IUsersState {
  users: IUser[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: IUsersState = {
  users: null,
  loading: false,
  error: null,
};

const usersReducer = (
  state: IUsersState = initialState,
  action: IAction,
): IUsersState => {
  switch (action.type) {
    case Users.FETCH_USERS:
      return { loading: true, error: null, users: null };
    case Users.FETCH_USERS_SUCCESS:
      return { loading: false, error: null, users: action.payload };
    case Users.FETCH_USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
        users: null,
      };
    default:
      return state;
  }
};

export default usersReducer;
