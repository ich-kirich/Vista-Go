import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styles from "./GuideRequestsTable.module.scss";
import {
  acceptGuideRequest,
  getGuidesRequests,
  rejectGuideRequest,
} from "../../../../api/adminService";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";

interface GuideRequest {
  id: number;
  requestText: string;
  contacts: string;
  description: string;
  User: {
    id: number;
    name: string;
    email: string;
  };
}

function GuideRequestsTable(props: { closeList: (state: null) => void }) {
  const { closeList } = props;
  const [requests, setRequests] = useState<GuideRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const data = await getGuidesRequests();
        setRequests(data);
      } catch (e: any) {
        setError(e?.response?.data?.message || t("app_error.unexpected_error"));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (error) {
      timeoutRef.current = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error]);

  const handleAccept = async (id: number) => {
    await acceptGuideRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = async (id: number) => {
    await rejectGuideRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Box className={styles.cardList}>
      <Button variant="contained" fullWidth onClick={() => closeList(null)}>
        {t("admin_page.guides.close_list")}
      </Button>
      <FetchWrapper loading={loading} error={error}>
        {requests &&
          requests.map((req) => (
            <Paper elevation={3} key={req.id} className={styles.card}>
              <Typography variant="h6">{req.User.name}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {req.User.email}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>{t("admin_page.guides.contacts")}:</strong>{" "}
                {req.contacts}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>{t("admin_page.guides.request_text")}:</strong>{" "}
                {req.requestText}
              </Typography>
              <Box className={styles.actions}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => handleAccept(req.id)}
                >
                  {t("admin_page.guides.accept")}
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleReject(req.id)}
                >
                  {t("admin_page.guides.reject")}
                </Button>
              </Box>
            </Paper>
          ))}
      </FetchWrapper>
    </Box>
  );
}

export default GuideRequestsTable;
