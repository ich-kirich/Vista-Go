import { Auth } from "../../libs/enums";
import { getValidToken } from "../../libs/utils";
import { IAction } from "../../types/types";

interface IAuthState {
  isAuth: boolean;
}

const initialState: IAuthState = {
  isAuth: getValidToken() ? true : false,
};

const authReducer = (
  state: IAuthState = initialState,
  action: IAction,
): IAuthState => {
  switch (action.type) {
    case Auth.LOGIN:
      return { ...state, isAuth: true };
    case Auth.LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export default authReducer;
