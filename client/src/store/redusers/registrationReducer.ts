import { REGISTRATION } from "../../libs/constants";
import { IAction } from "../../types/types";

interface IRegistrationState {
  loading: boolean;
  error: null | string;
}

const initialState: IRegistrationState = {
  loading: false,
  error: null,
};

const registrationReducer = (
  state: IRegistrationState = initialState,
  action: IAction,
): IRegistrationState => {
  switch (action.type) {
    case REGISTRATION.FETCH_REGISTRATION:
      return { loading: true, error: null };
    case REGISTRATION.FETCH_REGISTRATION_SUCCESS:
      return { loading: false, error: null };
    case REGISTRATION.FETCH_REGISTRATION_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registrationReducer;
