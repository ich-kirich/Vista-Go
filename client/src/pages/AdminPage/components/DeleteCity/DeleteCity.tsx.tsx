import { Box, Typography, NativeSelect, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function DeleteCity() {
  const [chooseCity, setChooseCity] = useState("");
  const [isClick, setIsClick] = useState(false);
  const { t, i18n } = useTranslation();

  const language = i18n.language as Locales;

  const { fetchCities, fetchDeleteCity, clearErrors } = useActions();
  const city = useTypedSelector((state) => state.city);
  useEffect(() => {
    fetchCities();
  }, [city.loading]);
  const { cities, error, loading } = useTypedSelector((state) => state.cities);

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (error || city.error) {
      timeoutRef.current = setTimeout(() => {
        clearErrors(["cities", "city"]);
        setIsClick(false);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error, city.error]);

  const selectCity = (value: string) => {
    setChooseCity(value);
  };

  const deleteCity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchDeleteCity(Number(chooseCity));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {isClick ? (
        <FetchWrapper loading={city.loading} error={city.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.delete.city.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            {t("admin_page.delete.city.select_label")}:
          </Typography>
          <NativeSelect
            value={chooseCity}
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
          <Button variant="contained" fullWidth onClick={deleteCity}>
            {t("admin_page.delete.city.button")}
          </Button>
        </>
      )}
    </FetchWrapper>
  );
}

export default DeleteCity;
