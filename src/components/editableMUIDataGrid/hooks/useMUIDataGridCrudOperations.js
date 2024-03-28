import { useCallback, useEffect, useState } from "react";
import { GridRowModes } from "@mui/x-data-grid-premium";
import { randomId } from "@mui/x-data-grid-generator";

export const useMUIDataGridCrudOperations = ({
  initialRows,
  newRowModel,
  store,
  update,
  remove
}) => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState({
    open: false,
    id: null
  });

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen({
      open: false,
      id: null
    });
  };

  const handleRows = (newRows) => {
    setRows(newRows);
  };

  const handleRowModesModel = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleEditRowStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditRowStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleAddNewRow = () => {
    const id = randomId();
    setRows([{ id, ...newRowModel, isNew: true }, ...rows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  const handleEditRow = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelEditRow = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleSaveRow = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleUpdateRow = (newRow, oldRow) => {
    const newRowAdded = oldRow.isNew;
    if (newRowAdded) {
      store(newRow);
    } else {
      update(newRow, oldRow);
    }
    return newRow;
  };

  const handleDeleteRow = (id) => {
    setDeleteDialogOpen({
      open: true,
      id: id
    });
  };

  const handleDeleteConfirmation = (id) => {
    remove(id);
  };

  const handleUpdateRowError = useCallback((error) => {
    console.log(error);
  }, []);

  return {
    rows,
    rowModesModel,
    deleteDialogOpen,
    handleDeleteDialogOpen,
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
    handleUpdateRowError
  };
};
