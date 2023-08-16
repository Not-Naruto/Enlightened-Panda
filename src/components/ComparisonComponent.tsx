import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  data: any[];
  file: any;
}

const orderColumns = (col1: string, col2: string, data: any[]) => {
  try {
    var val1 = eval(data[0][col1]);
  } catch {
    var val1 = data[0][col1];
  }

  if (typeof val1 === "string") {
    return { column1: col1, column2: col2 };
  } else {
    return { column1: col2, column2: col1 };
  }
};

const ComparisonComponent = ({ data, file }: Props) => {
  const [col1, setCol1] = useState<string>("");
  const [col2, setCol2] = useState<string>("");

  const [selectedColumns, setSelectedColumns] = useState({
    column1: "",
    column2: "",
  });

  const columns = Object.keys(data[0]);

  return (
    <Box sx={{ m: 5 }}>
      <Typography
        sx={{ my: 5, fontWeight: "bold", color: "primary.main" }}
        variant="h2"
      >
        Comparison
      </Typography>
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
      <Grid container columnSpacing={3} rowSpacing={1}>
        <Grid item xs={12} md={5}>
          <Typography sx={{ marginY: 2, marginX: 1 }}>Column 1</Typography>
          <Select
            label="Column 1"
            id="column1"
            sx={{
              overflow: "hidden",
              borderRadius: "10px",

              height: "40px",
              width: "100%",
              bgcolor: "primary.light",
            }}
            value={col1}
          >
            <MenuItem
              key={""}
              value={""}
              onClick={() => {
                setCol1("");
              }}
            >
              {""}
            </MenuItem>
            {columns.map((col) => (
              <MenuItem
                key={col}
                value={col}
                onClick={() => {
                  setCol1(`${col}`);
                }}
              >
                {col}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography sx={{ marginY: 2, marginX: 1 }}>Column 2</Typography>
          <Select
            label="Column 2"
            id="column2"
            sx={{
              overflow: "hidden",
              borderRadius: "10px",

              height: "40px",
              width: "100%",
              bgcolor: "primary.light",
            }}
            value={col2}
          >
            <MenuItem key={""} value={""} onClick={() => setCol2("")}>
              {""}
            </MenuItem>
            {columns.map((col) => (
              <MenuItem key={col} value={col} onClick={() => setCol2(`${col}`)}>
                {col}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "40px",
              borderRadius: "10px",
              marginTop: 3,
            }}
            onClick={() => setSelectedColumns(orderColumns(col1, col2, data))}
          >
            <strong>COMPARE</strong>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComparisonComponent;
