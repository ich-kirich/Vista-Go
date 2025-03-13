import { Box } from "@mui/material";
import { useEffect, useRef, useCallback } from "react";
import classnames from "classnames";
import { IModalComponentProps } from "../../types/types";
import styles from "./PopupComponent.module.scss";

function PopupComponent({
  children,
  visible,
  setVisible,
}: IModalComponentProps) {
  const box = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (box.current && !box.current.contains(e.target as Node)) {
        setVisible(false);
      }
    },
    [setVisible],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [visible, onClickOutside]);

  if (!visible) return null;

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
