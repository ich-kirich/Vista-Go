import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCity from "../store/actionCreators/city";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ fetchCity }, dispatch);
};

export default useActions;
