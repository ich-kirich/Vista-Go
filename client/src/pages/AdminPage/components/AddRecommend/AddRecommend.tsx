import { Box, Typography, NativeSelect, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function AddRecommend() {
  const [isClick, setIsClick] = useState(false);
  const [city, setCity] = useState("");
  const { t, i18n } = useTranslation();

  const language = i18n.language as Locales;

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
        {isClick ? (
          <FetchWrapper loading={recommend.loading} error={recommend.error}>
            <Typography variant="h6" component="h5">
              {t("admin_page.add.recommend.success")}
            </Typography>
          </FetchWrapper>
        ) : (
          <>
            <Typography variant="h6" component="h2">
              {t("admin_page.add.recommend.city")}:
            </Typography>
            <NativeSelect
              value={city}
              onChange={(e) => selectCity(e.target.value)}
              variant="standard"
            >
              {cities &&
                cities.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name[language] || item.name.en}
                  </option>
                ))}
            </NativeSelect>
            <Button variant="contained" fullWidth onClick={addRecommend}>
              {t("admin_page.add.recommend")}
            </Button>
          </>
        )}
      </Box>
    </FetchWrapper>
  );
}

export default AddRecommend;
