import { GridEditSingleSelectCell } from "@mui/x-data-grid-premium";
import React from "react";
import { useGridApiContext } from "@mui/x-data-grid-premium";

const CustomEditComponent = (props) => {
  const { id, value, field, contactData } = props;
  const apiRef = useGridApiContext();
  const handleValueChange = (evt, newValue) => {
    const getEmailFromContact = contactData.find(
      (contact) => contact.id === newValue
    );

    if (Object.keys(getEmailFromContact).length > 0) {
      const email = getEmailFromContact?.email;
      const mobilePhone = getEmailFromContact?.MobilePhone;
      if (mobilePhone) {
        apiRef.current.setEditCellValue({
          id,
          field: "MobilePhone",
          value: mobilePhone
        });
      } else {
        apiRef.current.setEditCellValue({
          id,
          field: "MobilePhone",
          value: ""
        });
      }
      if (email) {
        apiRef.current.setEditCellValue({ id, field: "email", value: email });
      } else {
        apiRef.current.setEditCellValue({ id, field: "email", value: "" });
      }
    }
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />
  );
};

export default CustomEditComponent;
