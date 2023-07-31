import {
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataTypesCode from "./DataTypesCode";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import TotalMissingCode from "./MissingCode/TotalMissingCode";

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
  return DataTypes;
}

function countMissingValues(objects: any[]) {
  let missingValuesCount = 0;
  let total = 0;
  const missingPerColumn: any = {};

  objects.forEach((row) => {
    Object.keys(row).forEach((col) => {
      total += 1;
      if (typeof row[col] === "string" && row[col].trim() === "") {
        missingValuesCount++;
        missingPerColumn[col] = (missingPerColumn[col] || 0) + 1;
      }
    });
  });
  return [
    missingValuesCount,
    total,
    (missingValuesCount * 100) / total,
    missingPerColumn,
  ];
}

const Overview = ({ data, file }: Props) => {
  const columns: GridColDef[] = generateColumns(data);
  const rows = generateRows(data);
  const missing = countMissingValues(data);
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
              <ListItem key={item[0]}>
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
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1}>
                      <Chip
                        sx={{ width: "80px" }}
                        label={item[1]}
                        color="primary"
                      />
                      <Typography>{`${item[0]}`}</Typography>
                    </Stack>
                  }
                />
              </ListItem>
            );
          })}
        </List>
        <Divider
          variant="middle"
          sx={{ my: 5, bgcolor: "text.primary" }}
        ></Divider>
        <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
          Data Discrepancies
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Missing Values
        </Typography>
        <TotalMissingCode fileName={file.name} />
        <Typography sx={{ marginTop: 3 }}>
          Total Missing Values: {missing[0]}
        </Typography>

        {missing[2] < 5 ? (
          <Typography>
            Percentage:{" "}
            <span style={{ color: "#3f834a" }}>{missing[2].toFixed(2)}%</span>
          </Typography>
        ) : missing[2] < 20 ? (
          <>
            <Typography>
              Percentage:{" "}
              <span style={{ color: "#f48c06" }}>{missing[2].toFixed(2)}%</span>
            </Typography>
            <Typography sx={{ color: "warning.main", marginTop: 2 }}>
              Consider Imputing Missing Values before performing Operations
            </Typography>
          </>
        ) : (
          <>
            <Typography>
              Percentage:{" "}
              <span style={{ color: "#e5383b" }}>{missing[2].toFixed(2)}%</span>
            </Typography>
            <Typography sx={{ color: "error.main", marginTop: 2 }}>
              Dataset is not reliable due to excessive missing values
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default Overview;
