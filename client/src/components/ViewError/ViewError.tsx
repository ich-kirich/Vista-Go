import { useTranslation } from "react-i18next";
import { IChildrenProps } from "../../types/types";

function ViewError({ children }: IChildrenProps) {
  const { t } = useTranslation();

  return (
    <h1>
      {t("error.title")}: {children}
    </h1>
  );
}

export default ViewError;
