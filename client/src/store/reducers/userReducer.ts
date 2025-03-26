import { USER } from "../../libs/constants";
import { IAction, IUser } from "../../types/types";
import { getValidToken } from "../../libs/utils";
import { JwtPayload } from "jwt-decode";

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
    case USER.FETCH_USER:
      return { loading: true, error: null, user: null };
    case USER.FETCH_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case USER.FETCH_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
