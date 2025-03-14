import { Box, Typography, NativeSelect, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";

function AddRecommend() {
  const [isClick, setIsClick] = useState(false);
  const [city, setCity] = useState("");

  const { fetchCities, fetchAddRecommend } = useActions();
  useEffect(() => {
    fetchCities();
  }, []);
  const { cities, error, loading } = useTypedSelector((state) => state.cities);
  const recommend = useTypedSelector((state) => state.recommend);

  const selectCity = (value: string) => {
    setCity(value);
  };

  const addRecommend = () => {
    setIsClick(true);
    fetchAddRecommend(Number(city));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box>
        <Typography variant="h6" component="h2">
          Select a city for a recommendation:
        </Typography>
        <NativeSelect
          value={city}
          onChange={(e) => selectCity(e.target.value)}
          variant="standard"
        >
          <option value="">Select</option>
          {cities &&
            cities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </NativeSelect>
        <Button variant="contained" fullWidth onClick={addRecommend}>
          Add Recommend
        </Button>
        {isClick && (
          <FetchWrapper loading={recommend.loading} error={recommend.error}>
            <Typography variant="h6" component="h5">
              The recommendation was successfully added
            </Typography>
          </FetchWrapper>
        )}
      </Box>
    </FetchWrapper>
  );
}

export default AddRecommend;
