import { Box } from "@mui/material";
import classnames from "classnames";
import { useEffect, useRef } from "react";
import { IModalComponentProps } from "../../types/types";
import styles from "./PopupComponent.module.scss";

function PopupComponent(props: IModalComponentProps) {
  const { children, visible, setVisible } = props;
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <Box
      className={classnames(
        styles.modal__invisible,
        visible && styles.modal__visible,
      )}
    >
      <Box className={styles.modal__content} ref={box}>
        {children}
      </Box>
    </Box>
  );
}

export default PopupComponent;
