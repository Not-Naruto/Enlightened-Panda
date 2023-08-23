import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  data: any[];
  col1: string;
  col2: string;
}

function generateColumns(data: any[], col: string) {
  const output: GridColDef[] = [
    {
      field: "Columns",
      headerName: "Columns",
      headerClassName: "TableHead",
      cellClassName: "TableHead",
      minWidth: 100,
      maxWidth: 300,
      flex: 1,
    },
  ];
  var cols: string[] = [];
  for (let i = 0; i < data.length; i++) {
    cols.push(data[i][col].trim());
  }
  cols = [...new Set(cols)].filter((a) => a !== "");

  for (let i = 0; i < cols.length; i++) {
    const value = cols[i];
    output.push({
      field: value,
      headerName: value,
      headerClassName: "TableHead",
      minWidth: 100,
      flex: 1,
    });
  }
  return output;
}

function generateRows(data: any[], col1: string, col2: string) {
  const output: any[] = [];
  var cols: string[] = [];
  for (let i = 0; i < data.length; i++) {
    cols.push(data[i][col2].trim());
  }
  cols = [...new Set(cols)].filter((a) => a !== "");

  var rows: string[] = [];
  for (let i = 0; i < data.length; i++) {
    rows.push(data[i][col1].trim());
  }
  rows = [...new Set(rows)].filter((a) => a !== "");

  for (let i = 0; i < rows.length; i++) {
    const row: any = { id: i, Columns: rows[i] };
    for (let j = 0; j < cols.length; j++) {
      const x = data.filter((r) => r[col1] === rows[i] && r[col2] === cols[j]);
      row[cols[j]] = x.length;
    }
    output.push(row);
  }
  return output;
}

const ContingencyTable = ({ data, col1, col2 }: Props) => {
  const columns = generateColumns(data, col2);
  const rows = generateRows(data, col1, col2);
  return (
    <Box
      sx={{
        "& .TableHead": {
          bgcolor: "primary.main",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ bgcolor: "background.paper", marginTop: 3 }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ContingencyTable;
