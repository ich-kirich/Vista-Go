import { useTranslation } from "react-i18next";
import { IChildrenProps } from "../../types/types";

function ViewError({ children }: IChildrenProps) {
  const { t } = useTranslation();

  return (
    <h1>
      {t("app_error.title")}:{" "}
      {typeof children === "string" ? t(children) : children}
    </h1>
  );
}

export default ViewError;
