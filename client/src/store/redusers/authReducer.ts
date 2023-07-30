import { AUTH, INITIAL_AUTH } from "../../libs/constants";
import { IAction, IAuthState } from "../../types/types";

const initialState: IAuthState = {
  isAuth: INITIAL_AUTH,
};

const authReducer = (
  state: IAuthState = initialState,
  action: IAction,
): IAuthState => {
  switch (action.type) {
    case AUTH.LOGIN:
      return { ...state, isAuth: true };
    case AUTH.LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export default authReducer;
