import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { IUser } from "../../../../types/types";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./UsersTable.module.scss";
import { useTranslation } from "react-i18next";
import { ROLES } from "../../../../libs/enums";
import { getValidToken } from "../../../../libs/utils";

function UserTable({ closeTable }: { closeTable: (state: null) => void }) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("email");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const {
    fetchUsers,
    fetchBanUser,
    fetchUnBanUser,
    clearErrors,
    fetchUpgradeRoleUser,
    fetchDowngradeRoleUser,
  } = useActions();

  const { users, error, loading } = useTypedSelector((state) => state.users);
  const {
    user,
    error: errorUser,
    loading: loadingUser,
  } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (!users) fetchUsers();
  }, [users]);

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (error) {
      timeoutRef.current = setTimeout(() => {
        clearErrors(["users", "user"]);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [error]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRoleChange = async (
    user: IUser,
    newRole: ROLES.USER | ROLES.ADMIN,
  ) => {
    setLoadingAction(true);
    try {
      if (newRole === ROLES.ADMIN) {
        fetchUpgradeRoleUser(user.id);
      } else {
        fetchDowngradeRoleUser(user.id);
      }
      setErrorMessage(null);
      fetchUsers();
    } catch (error) {
      setErrorMessage(t(`${error}`));
    } finally {
      setLoadingAction(false);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (user: IUser) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleBanToggle = async () => {
    if (selectedUser) {
      setLoadingAction(true);

      try {
        if (selectedUser.isBanned) {
          fetchUnBanUser(selectedUser.email);
        } else {
          fetchBanUser(selectedUser.email);
        }
        setErrorMessage(null);
        fetchUsers();
      } catch (error) {
        setErrorMessage(t("admin_page.users.banError"));
      } finally {
        setLoadingAction(false);
        handleCloseDialog();
      }
    }
  };

  const sortedUsers = users
    ? users.sort((a, b) => {
        if (orderBy === "email") {
          return order === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        }
        return 0;
      })
    : [];

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box className={styles.table__wrapper}>
      <Button variant="contained" fullWidth onClick={() => closeTable(null)}>
        {t("admin_page.users.close_table")}
      </Button>
      <FetchWrapper
        loading={loading || loadingAction || loadingUser}
        error={error || errorMessage || errorUser}
      >
        {users && (
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="email"
                      sortDirection={orderBy === "email" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "email"}
                        direction={orderBy === "email" ? order : "asc"}
                        onClick={() => handleRequestSort("email")}
                      >
                        {t("admin_page.users.email")}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>{t("admin_page.users.username")}</TableCell>
                    <TableCell>{t("admin_page.users.role")}</TableCell>
                    <TableCell>{t("admin_page.users.banned")}</TableCell>
                    {(user || getValidToken())?.role === ROLES.SUPER_ADMIN && (
                      <TableCell>{t("admin_page.users.actions")}</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((userElem) => (
                    <TableRow
                      hover
                      key={userElem.email}
                      onDoubleClick={() => handleOpenDialog(userElem)}
                    >
                      <TableCell>{userElem.email}</TableCell>
                      <TableCell>{userElem.name}</TableCell>
                      <TableCell>{userElem.role}</TableCell>
                      <TableCell>
                        {userElem.isBanned ? <GavelIcon /> : <TagFacesIcon />}
                      </TableCell>
                      {(user || getValidToken())?.role ===
                        ROLES.SUPER_ADMIN && (
                        <TableCell>
                          {userElem?.role === ROLES.USER ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                handleRoleChange(userElem, ROLES.ADMIN)
                              }
                            >
                              {t("admin_page.users.upgrade")}
                            </Button>
                          ) : (
                            userElem?.role === ROLES.ADMIN && (
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                  handleRoleChange(userElem, ROLES.USER)
                                }
                              >
                                {t("admin_page.users.downgrade")}
                              </Button>
                            )
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={null}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>
                {selectedUser?.isBanned
                  ? t("admin_page.users.unban")
                  : t("admin_page.users.ban")}{" "}
                {t("admin_page.users.user")}
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  {t("admin_page.users.warning")}{" "}
                  {selectedUser?.isBanned
                    ? t("admin_page.users.unban")
                    : t("admin_page.users.ban")}{" "}
                  {t("admin_page.users.user")}{" "}
                  <strong>{selectedUser?.email}</strong>?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  {t("admin_page.users.close_warning")}
                </Button>
                <Button onClick={handleBanToggle} color="secondary">
                  {selectedUser?.isBanned
                    ? t("admin_page.users.unban")
                    : t("admin_page.users.ban")}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </FetchWrapper>
    </Box>
  );
}

export default UserTable;
