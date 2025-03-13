import { AUTH } from "../../libs/constants";
import { IAction } from "../../types/types";

interface IAuthState {
  isAuth: boolean;
}

const initialState: IAuthState = {
  isAuth: !!localStorage.getItem("token"),
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
