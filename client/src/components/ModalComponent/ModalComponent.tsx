import { Box } from "@mui/material";
import classnames from "classnames";
import { useContext } from "react";
import { CONTEXT } from "../../libs/constants";
import { IModalComponentProps } from "../../types/types";
import styles from "./ModalComponent.module.scss";

function ModalComponent(props: IModalComponentProps) {
  const { children, visible, setVisible, setCountry } = props;
  const { setNameCity } = useContext(CONTEXT);

  const closePopup = () => {
    setVisible(false);
    setCountry([]);
    setNameCity("");
  };

  return (
    <Box
      className={classnames(
        styles.modal__invisible,
        visible && styles.modal__visible,
      )}
      onClick={closePopup}
    >
      {visible && <Box className={styles.modal__content}>{children}</Box>}
    </Box>
  );
}

export default ModalComponent;
