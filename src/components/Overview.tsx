import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataTypesCode from "./DataTypesCode";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

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

function getDataTypes(columns: any) {
  const DataTypes: string[][] = [];
  for (const key in columns) {
    try {
      var value = eval(columns[key]);
    } catch {
      var value = columns[key];
    }
    if (typeof value === "number" && Number.isInteger(value)) {
      DataTypes.push([key, "integer"]);
    } else if (typeof value === "number") {
      DataTypes.push([key, "float"]);
    } else if (typeof value === "boolean") {
      DataTypes.push([key, "boolean"]);
    } else {
      DataTypes.push([key, "string"]);
    }
  }
  console.log(DataTypes);
  return DataTypes;
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
        <DataTypesCode fileName={file.name} />
        <List sx={{ marginTop: 3 }}>
          {getDataTypes(data[0]).map((item) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.dark" }}>
                    {item[1] === "integer" || item[1] === "float" ? (
                      <FormatListNumberedOutlinedIcon
                        sx={{ color: "#c1d4c6" }}
                      />
                    ) : (
                      <CategoryOutlinedIcon sx={{ color: "#c1d4c6" }} />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`[${item[1]}] - ${item[0]}`} />
              </ListItem>
            );
          })}
        </List>
        <Divider
          variant="middle"
          sx={{ my: 5, bgcolor: "text.primary" }}
        ></Divider>
      </Box>
    </>
  );
};

export default Overview;
