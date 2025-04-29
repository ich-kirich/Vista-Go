import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { createGuideRequest } from "../../../../api/userService";
import styles from "./GuideRequestModal.module.scss";
import { useTranslation } from "react-i18next";
import Loader from "../../../../components/Loader/Loader";
import { AppError } from "../../../../libs/enums";

interface GuideRequestModalProps {
  open: boolean;
  onClose: () => void;
}

function GuideRequestModal({ open, onClose }: GuideRequestModalProps) {
  const [contacts, setContacts] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await createGuideRequest(contacts, description, message);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || t("app_error.unexpected_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modal}>
        {loading ? (
          <Box className={styles.center}>
            <Loader />
          </Box>
        ) : success ? (
          <Typography variant="h6" color="success">
            {t("guide_request_modal.success")}
          </Typography>
        ) : (
          <>
            <Typography variant="h6">
              {t("guide_request_modal.title")}
            </Typography>
            <TextField
              label={t("guide_request_modal.contacts")}
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label={t("guide_request_modal.description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              label={t("guide_request_modal.text_request")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {t(AppError[error as keyof typeof AppError] || error)}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              {t("guide_request_modal.send")}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default GuideRequestModal;
