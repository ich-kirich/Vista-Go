import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCities from "../store/actionCreators/cities";
import fetchCity from "../store/actionCreators/city";
import fetchRecommends from "../store/actionCreators/recommends";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { fetchCity, fetchCities, fetchRecommends },
    dispatch,
  );
};

export default useActions;
