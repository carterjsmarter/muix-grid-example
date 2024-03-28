import * as React from "react";
import { useGridApiContext } from "@mui/x-data-grid-premium";
import { TextField } from "@mui/material";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/utils";

const CustomEditInputComponent = (props) => {
  const { id, value, hasFocus, field } = props;
  const inputRef = React.useRef();
  const apiRef = useGridApiContext();

  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);

  return (
    <TextField
      inputRef={inputRef}
      name="DurationToStation"
      value={value}
      onChange={(evt) => {
        apiRef.current.setEditCellValue({ id, field, value: evt.target.value });
      }}
      variant="standard"
      fullWidth
    />
  );
};

export default CustomEditInputComponent;
