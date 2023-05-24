import { Box, Typography, NativeSelect, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

function AddRecommend() {
  const [isClick, setIsClick] = useState(false);
  const [city, setCity] = useState("");

  const { fetchCities, fetchAddAdminRecommend } = useActions();
  useEffect(() => {
    fetchCities();
  }, []);
  const { cities, error, loading } = useTypedSelector((state) => state.cities);
  const recommend = useTypedSelector((state) => state.adminRecommend);

  const selectCity = (value: string) => {
    setCity(value);
  };

  const addRecommend = () => {
    setIsClick(true);
    fetchAddAdminRecommend(Number(city));
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
                Select a city for a recommendation:
              </Typography>
              <NativeSelect
                value={city}
                onChange={(e) => selectCity(e.target.value)}
                variant="standard"
              >
                {cities.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </NativeSelect>
              <Button variant="contained" fullWidth onClick={addRecommend}>
                Add Recommend
              </Button>
              {isClick && (
                <Box>
                  {recommend.loading ? (
                    <Loader />
                  ) : (
                    <Box>
                      {recommend.error ? (
                        <ViewError>{error}</ViewError>
                      ) : (
                        <Typography variant="h6" component="h5">
                          The recommendation was successfully added
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

export default AddRecommend;
