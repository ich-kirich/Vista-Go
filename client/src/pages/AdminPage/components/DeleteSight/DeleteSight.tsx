import { Typography, NativeSelect, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function DeleteSight() {
  const [chooseSight, setChooseSight] = useState("");
  const [isClick, setIsClick] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchAllSights, fetchDeleteSight, clearErrors } = useActions();
  const sight = useTypedSelector((state) => state.sight);
  useEffect(() => {
    fetchAllSights();
  }, [sight.loading]);
  const { sights, error, loading } = useTypedSelector((state) => state.sights);

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (error || sight.error) {
      timeoutRef.current = setTimeout(() => {
        clearErrors(["sights", "sight"]);
        setIsClick(false);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error, sight.error]);

  const selectSight = (value: string) => {
    setChooseSight(value);
  };

  const deleteSight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchDeleteSight(Number(chooseSight));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {isClick ? (
        <FetchWrapper loading={sight.loading} error={sight.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.delete.sight.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            {t("admin_page.delete.sight.select_label")}:
          </Typography>
          <NativeSelect
            value={chooseSight}
            onChange={(e) => selectSight(e.target.value)}
            variant="standard"
          >
            {sights &&
              sights.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name[language] || item.name.en}
                </option>
              ))}
          </NativeSelect>
          <Button variant="contained" fullWidth onClick={deleteSight}>
            {t("admin_page.delete.sight.button")}
          </Button>
        </>
      )}
    </FetchWrapper>
  );
}

export default DeleteSight;
