import { Box, Button } from "@mui/material";
import { useState } from "react";
import styles from "./AdminEntityPanel.module.scss";
import { AdminEntity } from "../../../../libs/enums";

interface AdminEntityPanelProps {
  entity: AdminEntity;
  components: Partial<Record<"add" | "update" | "delete", JSX.Element>>;
}

function AdminEntityPanel({ entity, components }: AdminEntityPanelProps) {
  const [visiblePanel, setVisiblePanel] = useState<
    keyof typeof components | null
  >(null);

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
            {key.charAt(0).toUpperCase() + key.slice(1)} {entity}
          </Button>
        ))}
      </Box>
      {visiblePanel && <Box>{components[visiblePanel]}</Box>}
    </Box>
  );
}

export default AdminEntityPanel;
