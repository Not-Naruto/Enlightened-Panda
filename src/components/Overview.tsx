import { Box, Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataTypesCode from "./DataTypesCode";

interface Props {
  data: any[];
  file: File;
}

function generateColumns(data: any[]): GridColDef[] {
  return Object.keys(data[0]).map((columnName) => {
    return {
      field: columnName,
      headerName: columnName,
      headerClassName: "TableHead",
      flex: 1,
    };
  });
}

function generateRows(data: any[]) {
  let idCounter = 0;
  const rows = data.map((row) => {
    const newRow = { ...row, id: idCounter };
    idCounter++;
    return newRow;
  });
  return rows;
}

const Overview = ({ data, file }: Props) => {
  const columns: GridColDef[] = generateColumns(data);
  const rows = generateRows(data);
  return (
    <>
      <Box
        sx={{
          margin: 5,
          "& .TableHead": {
            bgcolor: "primary.main",
          },
        }}
      >
        <Typography
          sx={{ my: 5, fontWeight: "bold", color: "primary.main" }}
          variant="h2"
        >
          Overview
        </Typography>
        <Divider
          variant="middle"
          sx={{ my: 5, bgcolor: "text.primary" }}
        ></Divider>
        <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
          Table
        </Typography>
        <DataGrid
          sx={{
            height: "635px",
            bgcolor: "primary.light",
          }}
          rows={rows}
          columns={columns}
          autoPageSize={true}
          disableRowSelectionOnClick
        />
        <Divider
          variant="middle"
          sx={{ my: 5, bgcolor: "text.primary" }}
        ></Divider>
        <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
          Data Types
        </Typography>
        <DataTypesCode file={file} />
      </Box>
    </>
  );
};

export default Overview;
