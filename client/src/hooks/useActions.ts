import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchAddRecommend,
  fetchDeleteRecommend,
} from "../store/actionCreators/adminRecommend";
import {
  fetchAddTag,
  fetchUpdateTag,
  fetchDeleteTag,
} from "../store/actionCreators/adminTag";
import {
  fetchCreateCity,
  fetchDeleteCity,
  fetchUpdateCity,
} from "../store/actionCreators/adminCity";
import {
  fetchCreateGuide,
  fetchDeleteGuide,
  fetchUpdateGuide,
} from "../store/actionCreators/adminGuide";
import {
  fetchCreateSight,
  fetchDeleteSight,
  fetchUpdateSight,
} from "../store/actionCreators/adminSight";
import { fetchCities, fetchCity } from "../store/actionCreators/cities";
import fetchGuides from "../store/actionCreators/guides";
import fetchRecommends from "../store/actionCreators/recommends";
import fetchRegistration from "../store/actionCreators/registration";
import {
  fetchSights,
  fetchSight,
  fetchAllSights,
} from "../store/actionCreators/sights";
import fetchTags from "../store/actionCreators/tags";
import {
  fetchUpdateUserImage,
  fetchUpdateUsername,
  fetchUpdateUserPassword,
} from "../store/actionCreators/updateUserInformation";
import fetchUser from "../store/actionCreators/user";
import { fetchCodeUser, fetchCodePassword } from "../store/actionCreators/code";

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
      fetchCodeUser,
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
