import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCities from "../store/actionCreators/cities";
import fetchCity from "../store/actionCreators/city";
import fetchRecommends from "../store/actionCreators/recommends";
import fetchRecommend from "../store/actionCreators/recommend";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { fetchCity, fetchRecommend, fetchCities, fetchRecommends },
    dispatch,
  );
};

export default useActions;
