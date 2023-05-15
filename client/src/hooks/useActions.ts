import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchCities from "../store/actionCreators/cities";
import fetchCity from "../store/actionCreators/city";
import fetchGuides from "../store/actionCreators/guides";
import fetchRecommends from "../store/actionCreators/recommends";
import fetchRegistration from "../store/actionCreators/registration";
import fetchSight from "../store/actionCreators/sight";
import fetchSights from "../store/actionCreators/sights";
import fetchUpdateUsername from "../store/actionCreators/updateUsername";
import fetchUser from "../store/actionCreators/user";

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
      fetchRegistration,
      fetchUser,
      fetchUpdateUsername,
    },
    dispatch,
  );
};

export default useActions;
