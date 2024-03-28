// @flow
import React from "react";
import { GridToolbarContainer } from "@mui/x-data-grid-premium";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const EditGridToolBar = (props) => {
  const { handleAddNewRow, disableAddingNewRow } = props;
  return (
    <GridToolbarContainer>
      <Button
        disabled={disableAddingNewRow}
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNewRow}
      >
        Add
      </Button>
    </GridToolbarContainer>
  );
};

export default EditGridToolBar;
