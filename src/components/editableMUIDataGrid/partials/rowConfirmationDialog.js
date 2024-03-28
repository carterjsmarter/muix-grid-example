//@flow
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import Button from "@mui/material/Button";

const RowConfirmationDialog = (props) => {
  const {
    deleteDialogOpen,
    handleDeleteConfirmation,
    handleDeleteDialogOpen
  } = props;

  return (
    <Dialog
      maxWidth={"md"}
      open={deleteDialogOpen.open}
      keepMounted
      onClose={() => {
        handleDeleteDialogOpen({
          open: false,
          id: null
        });
      }}
    >
      <DialogTitle>Delete Entry Confirmation.</DialogTitle>
      <DialogContent dividers>
        Press Yes to confirm entry deletion.
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const rowId = deleteDialogOpen.id;
            handleDeleteDialogOpen({
              open: false,
              id: null
            });
            handleDeleteConfirmation(rowId);
          }}
        >
          yes
        </Button>
        <Button
          onClick={() => {
            handleDeleteDialogOpen({
              open: false,
              id: null
            });
          }}
        >
          no
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RowConfirmationDialog;
