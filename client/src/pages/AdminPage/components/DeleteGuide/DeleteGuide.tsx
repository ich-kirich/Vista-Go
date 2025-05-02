import { Typography, NativeSelect, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function DeleteGuide() {
  const [chooseGuide, setChooseGuide] = useState("");
  const [isClick, setIsClick] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchGuides, fetchDeleteGuide, clearErrors } = useActions();
  const guide = useTypedSelector((state) => state.guide);
  useEffect(() => {
    fetchGuides();
  }, [guide.loading]);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (error || guide.error) {
      timeoutRef.current = setTimeout(() => {
        clearErrors(["guides", "guide"]);
        setIsClick(false);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error, guide.error]);

  const selectGuide = (value: string) => {
    setChooseGuide(value);
  };

  const deleteGuide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchDeleteGuide(Number(chooseGuide));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {isClick ? (
        <FetchWrapper loading={guide.loading} error={guide.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.delete.guide.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            {t("admin_page.delete.guide.select_label")}:
          </Typography>
          <NativeSelect
            value={chooseGuide}
            onChange={(e) => selectGuide(e.target.value)}
            variant="standard"
          >
            {guides &&
              guides.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name[language] || item.name.en}
                </option>
              ))}
          </NativeSelect>
          <Button variant="contained" fullWidth onClick={deleteGuide}>
            {t("admin_page.delete.guide.button")}
          </Button>
        </>
      )}
    </FetchWrapper>
  );
}

export default DeleteGuide;
