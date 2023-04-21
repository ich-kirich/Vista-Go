import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCity from "../store/actionCreators/city";
import fetchRecommend from "../store/actionCreators/recommend";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ fetchCity, fetchRecommend }, dispatch);
};

export default useActions;
