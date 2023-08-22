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
import Cat_Cat from "./BivariateGraphs/Cat_Cat";
import Cat_Num from "./BivariateGraphs/Cat_Num";
import Num_Num from "./BivariateGraphs/Num_Num";

interface Props {
  data: any[];
  file: any;
}

const orderColumns = (col1: string, col2: string, data: any[]) => {
  if (col1 === "" || col2 === "") {
    return {
      column1: "",
      column2: "",
      dt1: "",
      dt2: "",
    };
  }

  try {
    var val1 = eval(data[0][col1]);
  } catch {
    var val1 = data[0][col1];
  }
  try {
    var val2 = eval(data[0][col2]);
  } catch {
    var val2 = data[0][col2];
  }

  const t = typeof val2;
  if (t === "string") {
    var t2 = "cat";
  } else {
    var t2 = "num";
  }

  if (typeof val1 === "string") {
    return { column1: col1, column2: col2, dt1: "cat", dt2: t2 };
  } else {
    return { column1: col2, column2: col1, dt1: t2, dt2: "num" };
  }
};

const BivariateComponent = ({ data, file }: Props) => {
  const [col1, setCol1] = useState<string>("");
  const [col2, setCol2] = useState<string>("");

  const [selectedColumns, setSelectedColumns] = useState({
    column1: "",
    column2: "",
    dt1: "",
    dt2: "",
  });

  const columns = Object.keys(data[0]);

  return (
    <Box sx={{ m: 5 }}>
      <Typography
        sx={{ my: 5, fontWeight: "bold", color: "primary.main" }}
        variant="h2"
      >
        Bivariate Graphs
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
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
      {!selectedColumns.dt1 && !selectedColumns.dt2 ? (
        <></>
      ) : selectedColumns.dt1 === "cat" && selectedColumns.dt2 === "cat" ? (
        <Cat_Cat
          fileName={file.name}
          col1={selectedColumns.column1}
          col2={selectedColumns.column2}
          data={data}
        />
      ) : selectedColumns.dt1 === "cat" && selectedColumns.dt2 === "num" ? (
        <Cat_Num
          fileName={file.name}
          col1={selectedColumns.column1}
          col2={selectedColumns.column2}
          data={data}
        />
      ) : (
        <Num_Num
          fileName={file.name}
          col1={selectedColumns.column1}
          col2={selectedColumns.column2}
          data={data}
        />
      )}
    </Box>
  );
};

export default BivariateComponent;
