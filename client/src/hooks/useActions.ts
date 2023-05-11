import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCities from "../store/actionCreators/cities";
import fetchCity from "../store/actionCreators/city";
import fetchGuides from "../store/actionCreators/guides";
import fetchRecommends from "../store/actionCreators/recommends";
import fetchSight from "../store/actionCreators/sight";
import fetchSights from "../store/actionCreators/sights";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      fetchCity,
      fetchCities,
      fetchRecommends,
      fetchSights,
      fetchSight,
      fetchGuides,
    },
    dispatch,
  );
};

export default useActions;
