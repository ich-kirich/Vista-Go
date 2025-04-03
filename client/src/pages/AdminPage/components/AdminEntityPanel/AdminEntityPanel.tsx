import { Box, Button } from "@mui/material";
import { useState } from "react";
import styles from "./AdminEntityPanel.module.scss";
import { AdminEntity } from "../../../../libs/enums";
import { useTranslation } from "react-i18next";

interface AdminEntityPanelProps {
  entity: AdminEntity;
  components: Partial<Record<"add" | "update" | "delete", JSX.Element>>;
}

function AdminEntityPanel({ entity, components }: AdminEntityPanelProps) {
  const [visiblePanel, setVisiblePanel] = useState<
    keyof typeof components | null
  >(null);
  const { t } = useTranslation();

  const actionTranslations = {
    add: t("admin_entity.actions.add"),
    update: t("admin_entity.actions.update"),
    delete: t("admin_entity.actions.delete"),
  };

  return (
    <Box className={styles.panel__wrapper}>
      <Box className={styles.controls__wrapper}>
        {Object.entries(components).map(([key]) => (
          <Button
            key={key}
            variant="contained"
            fullWidth
            onClick={() => setVisiblePanel(key as keyof typeof components)}
          >
            {actionTranslations[key as keyof typeof actionTranslations]}{" "}
            {t(`admin_entity.${entity}`)}
          </Button>
        ))}
      </Box>
      {visiblePanel && <Box>{components[visiblePanel]}</Box>}
    </Box>
  );
}

export default AdminEntityPanel;
