import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  data: any[];
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

const Overview = ({ data }: Props) => {
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
        <Typography sx={{ mb: 5 }} variant="h2">
          Overview
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
      </Box>
    </>
  );
};

export default Overview;
