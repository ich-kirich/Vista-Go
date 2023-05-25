import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchAddRecommend from "../store/actionCreators/adminAddRecommend";
import fetchAddTag from "../store/actionCreators/adminAddTag";
import fetchCreateCity from "../store/actionCreators/adminCreateCity";
import fetchCreateGuide from "../store/actionCreators/adminCreateGuide";
import fetchCreateSight from "../store/actionCreators/adminCreateSight";
import fetchDeleteCity from "../store/actionCreators/adminDeleteCity";
import fetchDeleteGuide from "../store/actionCreators/adminDeleteGuide";
import fetchDeleteRecommend from "../store/actionCreators/adminDeleteRecommend";
import fetchDeleteSight from "../store/actionCreators/adminDeleteSight";
import fetchDeleteTag from "../store/actionCreators/adminDeleteTag";
import fetchUpdateCity from "../store/actionCreators/adminUpdateCity";
import fetchUpdateGuide from "../store/actionCreators/adminUpdateGuide";
import fetchUpdateSight from "../store/actionCreators/adminUpdateSight";
import fetchUpdateTag from "../store/actionCreators/adminUpdateTag";
import fetchAllSights from "../store/actionCreators/allSights";
import fetchCities from "../store/actionCreators/cities";
import fetchCity from "../store/actionCreators/city";
import fetchCode from "../store/actionCreators/code";
import fetchCodePassword from "../store/actionCreators/codePassword";
import fetchGuides from "../store/actionCreators/guides";
import fetchRecommends from "../store/actionCreators/recommends";
import fetchRegistration from "../store/actionCreators/registration";
import fetchSight from "../store/actionCreators/sight";
import fetchSights from "../store/actionCreators/sights";
import fetchTags from "../store/actionCreators/tags";
import fetchUpdateUserImage from "../store/actionCreators/updateUserImage";
import fetchUpdateUsername from "../store/actionCreators/updateUsername";
import fetchUpdateUserPassword from "../store/actionCreators/updateUserPassword";
import fetchUser from "../store/actionCreators/user";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      fetchCity,
      fetchCities,
      fetchRecommends,
      fetchSights,
      fetchAllSights,
      fetchSight,
      fetchGuides,
      fetchRegistration,
      fetchUser,
      fetchUpdateUsername,
      fetchUpdateUserImage,
      fetchCode,
      fetchUpdateUserPassword,
      fetchCodePassword,
      fetchAddRecommend,
      fetchDeleteRecommend,
      fetchTags,
      fetchAddTag,
      fetchDeleteTag,
      fetchUpdateTag,
      fetchCreateGuide,
      fetchDeleteGuide,
      fetchUpdateGuide,
      fetchCreateSight,
      fetchDeleteSight,
      fetchUpdateSight,
      fetchCreateCity,
      fetchDeleteCity,
      fetchUpdateCity,
    },
    dispatch,
  );
};

export default useActions;
