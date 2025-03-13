import { Box } from "@mui/material";
import classnames from "classnames";
import { IModalComponentProps } from "../../../../types/types";
import styles from "./ModalComponent.module.scss";

function ModalComponent(props: IModalComponentProps) {
  const { children, visible, setVisible } = props;

  const closePopup = () => {
    setVisible(false);
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
