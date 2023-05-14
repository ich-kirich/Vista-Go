import { USER } from "../../libs/constants";
import { IAction, IUserState } from "../../types/types";

const initialState: IUserState = {
  user: "",
  loading: false,
  error: null,
};

const userReducer = (
  state: IUserState = initialState,
  action: IAction,
): IUserState => {
  switch (action.type) {
    case USER.FETCH_USER:
      return { loading: true, error: null, user: "" };
    case USER.FETCH_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case USER.FETCH_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
        user: "",
      };
    default:
      return state;
  }
};

export default userReducer;
