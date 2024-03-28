import React, { Fragment, useMemo } from "react";
import { useMUIDataGridCrudOperations } from "./hooks/useMUIDataGridCrudOperations";
import EditGridToolBar from "./partials/editGridToolBar";
import GridRowToolBar from "./partials/gridRowToolBar";
import GridRowEditToolBar from "./partials/gridRowEditToolBar";
import RowConfirmationDialog from "./partials/rowConfirmationDialog";
import { DataGridPremium, GridRowModes } from "@mui/x-data-grid-premium";

const EditableMUIDataGrid = (props) => {
  const {
    initialState,
    loading,
    columns,
    data,
    newRowModel,
    store,
    update,
    remove,
    hideEditButton = false,
    dataGridProOtherProps
  } = props;

  const {
    rows,
    rowModesModel,
    handleRows,
    handleRowModesModel,
    handleEditRowStart,
    handleEditRowStop,
    handleEditRow,
    handleCancelEditRow,
    handleAddNewRow,
    handleSaveRow,
    handleDeleteRow,
    handleDeleteConfirmation,
    handleUpdateRow,
    handleUpdateRowError,
    deleteDialogOpen,
    handleDeleteDialogOpen
  } = useMUIDataGridCrudOperations({
    initialRows: data,
    newRowModel,
    store,
    update,
    remove
  });

  const gridColumns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        const id = params.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridRowEditToolBar
              id={id}
              handleSaveRow={handleSaveRow}
              handleCancelEditRow={handleCancelEditRow}
            />
          ];
        }
        return [
          <GridRowToolBar
            id={id}
            hideEditButton={hideEditButton}
            handleEditRow={handleEditRow}
            handleDeleteRow={handleDeleteRow}
          />
        ];
      }
    },
    ...columns
  ];

  const disableAddingNewRow = useMemo(
    () =>
      Boolean(rows.find((f) => f.isNew === true)) ||
      (Object.values(rowModesModel).length > 0 &&
        Boolean(
          Object.values(rowModesModel).find((f) => f.mode === GridRowModes.Edit)
        )),
    [data, rows, rowModesModel]
  );

  return (
    <Fragment>
      <RowConfirmationDialog
        deleteDialogOpen={deleteDialogOpen}
        handleDeleteDialogOpen={handleDeleteDialogOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
      />
      <DataGridPremium
        rows={rows}
        columns={gridColumns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModel}
        onRowEditStop={handleEditRowStop}
        onRowEditStart={handleEditRowStart}
        processRowUpdate={handleUpdateRow}
        onProcessRowUpdateError={handleUpdateRowError}
        slots={{
          toolbar: EditGridToolBar
        }}
        slotProps={{
          toolbar: { handleAddNewRow, disableAddingNewRow }
        }}
        loading={loading}
        density={"compact"}
        initialState={initialState}
        sx={{ bgcolor: "background.paper" }}
        {...dataGridProOtherProps}
      />
    </Fragment>
  );
};

export default EditableMUIDataGrid;
