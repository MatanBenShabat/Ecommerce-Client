import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function SellerActions({ handleDelete, handleEdit = () => {} }) {
  const actions = [
    { icon: <DeleteIcon />, name: "Delete", action: handleDelete },
    { icon: <EditIcon />, name: "Edit", handleEdit },
  ];

  return (
    <SpeedDial
      ariaLabel="Seller Options"
      sx={{ position: "absolute", bottom: 10, right: 10 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
}
