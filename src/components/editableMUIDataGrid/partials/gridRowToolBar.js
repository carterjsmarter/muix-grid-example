// @flow
import React, { Fragment } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GridRowToolBar = (props) => {
  const { handleEditRow, handleDeleteRow, id, hideEditButton } = props;
  return (
    <Fragment>
      {!hideEditButton && (
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditRow(id)}
          color="primary"
        />
      )}
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => handleDeleteRow(id)}
        color={"error"}
      />
    </Fragment>
  );
};

export default GridRowToolBar;
