import jwt_decode from "jwt-decode";
import { USER } from "../../libs/constants";
import { IAction, IUserState } from "../../types/types";

const token = localStorage.getItem("token");

const initialState: IUserState = {
  user: token ? jwt_decode(token) : null,
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
