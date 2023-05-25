import { Box, Typography, NativeSelect, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

function DeleteRecommend() {
  const [chooseRecommend, setChooseRecommend] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchCities, fetchDeleteRecommend } = useActions();
  const recommend = useTypedSelector((state) => state.recommend);
  useEffect(() => {
    fetchCities();
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
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? (
            <ViewError>{error}</ViewError>
          ) : (
            <Box>
              <Typography variant="h6" component="h2">
                Select a recommendation:
              </Typography>
              <NativeSelect
                value={chooseRecommend}
                onChange={(e) => selectRecommend(e.target.value)}
                variant="standard"
              >
                <option value="">Select</option>
                {recommends.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </NativeSelect>
              <Button variant="contained" fullWidth onClick={deleteRecommend}>
                Delete Recommend
              </Button>
              {isClick && (
                <Box>
                  {recommend.loading ? (
                    <Loader />
                  ) : (
                    <Box>
                      {recommend.error ? (
                        <ViewError>{recommend.error}</ViewError>
                      ) : (
                        <Typography variant="h6" component="h5">
                          The recommendation was successfully deleted
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default DeleteRecommend;
