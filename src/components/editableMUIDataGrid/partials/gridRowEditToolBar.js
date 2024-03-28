// @flow
import React, { Fragment } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid-premium";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

const GridRowEditToolBar = (props) => {
  const { handleSaveRow, handleCancelEditRow, id } = props;
  return (
    <Fragment>
      <GridActionsCellItem
        icon={<SaveIcon />}
        label="Save"
        onClick={() => handleSaveRow(id)}
      />
      <GridActionsCellItem
        icon={<CancelIcon />}
        label="Cancel"
        className="textPrimary"
        onClick={() => handleCancelEditRow(id)}
        color="inherit"
      />
    </Fragment>
  );
};

export default GridRowEditToolBar;
