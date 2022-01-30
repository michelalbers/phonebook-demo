import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ContactDbContext } from "../hooks/useContactDb";

export const ContactList: React.FC<{}> = () => {
  const { contacts, removeContact } = React.useContext(ContactDbContext);

  const [deleteDialogParams, setDeleteDialogParams] = useState({
    open: false,
    onDelete: () => {},
    onCancel: () => {},
  });

  const closeDeleteDialog = React.useCallback(() => {
    setDeleteDialogParams((params) => ({ ...params, open: false }));
  }, []);

  const onOpenDeleteDialog = React.useCallback(
    (id: string) => {
      setDeleteDialogParams({
        open: true,
        onCancel: closeDeleteDialog,
        onDelete: () => {
          removeContact(id);
          closeDeleteDialog();
        },
      });
    },
    [setDeleteDialogParams, removeContact, closeDeleteDialog]
  );

  return (
    <>
      <Dialog
        open={deleteDialogParams.open}
        onClose={deleteDialogParams.onCancel}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          <Typography>Do you really want to delete this contact?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color={"error"} onClick={deleteDialogParams.onDelete}>
            Yes
          </Button>
          <Button color={"primary"} onClick={deleteDialogParams.onCancel}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={contact.name}
              secondary={contact.phoneNumber}
            />
            <IconButton
              data-testid={`edit-${contact.id}`}
              href={`/edit/${contact.id}`}
            >
              <Edit />
            </IconButton>
            <IconButton
              data-testid={`delete-${contact.id}`}
              onClick={() => onOpenDeleteDialog(contact.id)}
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
