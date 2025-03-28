import { IAction, IUser } from "../../types/types";
import { getValidToken } from "../../libs/utils";
import { JwtPayload } from "jwt-decode";
import { LocalStorageKeys, User } from "../../libs/enums";

interface IUserState {
  user: (IUser & JwtPayload) | null;
  loading: boolean;
  error: null | string;
}

const initialState: IUserState = {
  user: getValidToken(),
  loading: false,
  error: null,
};

const userReducer = (
  state: IUserState = initialState,
  action: IAction,
): IUserState => {
  switch (action.type) {
    case User.FETCH_USER:
      return { loading: true, error: null, user: null };
    case User.FETCH_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case User.FETCH_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
        user: null,
      };
    case User.FETCH_USER_LOGOUT:
      localStorage.removeItem(LocalStorageKeys.TOKEN);
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
