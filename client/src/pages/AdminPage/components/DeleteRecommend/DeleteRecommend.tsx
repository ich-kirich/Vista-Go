import { Typography, NativeSelect, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";

function DeleteRecommend() {
  const [chooseRecommend, setChooseRecommend] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchRecommends, fetchDeleteRecommend } = useActions();
  const recommend = useTypedSelector((state) => state.recommend);
  useEffect(() => {
    fetchRecommends();
  }, [recommend.loading]);
  const { recommends, error, loading } = useTypedSelector(
    (state) => state.recommends,
  );

  const selectRecommend = (value: string) => {
    setChooseRecommend(value);
  };

  const deleteRecommend = () => {
    setIsClick(true);
    fetchDeleteRecommend(Number(chooseRecommend));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {isClick ? (
        <FetchWrapper loading={recommend.loading} error={recommend.error}>
          <Typography variant="h6" component="h5">
            The recommendation was successfully deleted
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            Select a recommendation:
          </Typography>
          <NativeSelect
            value={chooseRecommend}
            onChange={(e) => selectRecommend(e.target.value)}
            variant="standard"
          >
            <option value="">Select</option>
            {recommends &&
              recommends.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </NativeSelect>
          <Button variant="contained" fullWidth onClick={deleteRecommend}>
            Delete Recommend
          </Button>
        </>
      )}
    </FetchWrapper>
  );
}

export default DeleteRecommend;
