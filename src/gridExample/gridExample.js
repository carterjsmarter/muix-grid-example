import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { contacts } from "../mockApi/api";
import CustomEditComponent from "../components/customEditComponent/customEditComponent";
import CustomEditInputComponent from "../components/customEditComponent/customEditInputComponent";
import EditableMUIDataGrid from "../components/editableMUIDataGrid/editableMUIDataGrid";

const GridExample = (props) => {
  const columns = useMemo(
    () => [
      {
        field: "ContactId",
        headerName: "Contact",
        width: 90,
        maxWidth: 180,
        flex: 1,
        editable: true,
        type: "singleSelect",
        valueOptions: contacts?.map((contact) => ({
          value: contact.id,
          label: contact.ContactName
        })),
        renderEditCell: (params) => (
          <CustomEditComponent {...params} contactData={contacts} />
        )
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 90,
        flex: 1,
        type: "text",
        editable: true
      },
      {
        field: "DurationToStation",
        headerName: "DurationToStation",
        minWidth: 120,
        flex: 1,
        editable: true,
        renderEditCell: (params) => <CustomEditInputComponent {...params} />
      },
      {
        field: "MobilePhone",
        headerName: "Mobile Phone",
        minWidth: 90,
        flex: 1,
        type: "text",
        editable: true
      }
    ],
    [contacts]
  );

  return (
    <Box>
      <EditableMUIDataGrid
        data={contacts}
        columns={columns}
        newRowModel={{
          ContactId: "",
          email: "",
          MobilePhone: ""
        }}
        store={() => {}}
        update={() => {}}
        remove={() => {}}
      />
    </Box>
  );
};

export default GridExample;
