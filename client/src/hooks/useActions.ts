import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fetchAddAdminRecommend from "../store/actionCreators/adminAddRecommend";
import fetchAddAdminTag from "../store/actionCreators/adminAddTag";
import fetchCreateGuide from "../store/actionCreators/adminCreateGuide";
import fetchDeleteGuide from "../store/actionCreators/adminDeleteGuide";
import fetchDeleteAdminRecommend from "../store/actionCreators/adminDeleteRecommend";
import fetchDeleteAdminTag from "../store/actionCreators/adminDeleteTag";
import fetchUpdateGuide from "../store/actionCreators/adminUpdateGuide";
import fetchUpdateAdminTag from "../store/actionCreators/adminUpdateTag";
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
      fetchSight,
      fetchGuides,
      fetchRegistration,
      fetchUser,
      fetchUpdateUsername,
      fetchUpdateUserImage,
      fetchCode,
      fetchUpdateUserPassword,
      fetchCodePassword,
      fetchAddAdminRecommend,
      fetchDeleteAdminRecommend,
      fetchTags,
      fetchAddAdminTag,
      fetchDeleteAdminTag,
      fetchUpdateAdminTag,
      fetchCreateGuide,
      fetchDeleteGuide,
      fetchUpdateGuide,
    },
    dispatch,
  );
};

export default useActions;
