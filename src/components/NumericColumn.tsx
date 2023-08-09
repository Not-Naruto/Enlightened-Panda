import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BarGraphCode from "./ColumnCode/BarGraphCode";
import Plot from "react-plotly.js";
import HistogramCode from "./ColumnCode/HistogramCode";

// CHOOSE THE NUMBER OF BINS ACCORDING TO FORMULA WHEN ALL STATISTICAL VALUES ARE CALCULATED

interface Props {
  fileName: string;
  data: { [key: string]: any }[];
  column: string;
}

const generateX = (data: { [key: string]: any }[], column: string) => {
  let x = [];
  for (let i = 0; i < data.length; i++) {
    if (Number.isNaN(parseFloat(data[i][column]))) {
    } else {
      x.push(parseFloat(data[i][column]));
    }
  }

  return x;
};

const NumericColumn = ({ fileName, data, column }: Props) => {
  const [graphType, setGraphType] = useState("Histogram");
  const x_values = generateX(data, column);

  return (
    <Box sx={{ margin: 5 }}>
      <Typography
        sx={{ my: 5, fontWeight: "bold", color: "primary.main" }}
        variant="h2"
      >
        {column} Column
      </Typography>
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
      <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
        Graph
      </Typography>
      <Select
        sx={{
          marginBottom: 3,
          overflow: "hidden",
          borderRadius: "15px",
          height: "40px",
          width: "200px",
          bgcolor: "primary.light",
        }}
        value={graphType}
      >
        <MenuItem value="Histogram" onClick={() => setGraphType("Histogram")}>
          Histogram
        </MenuItem>

        <MenuItem value="KDE-plot" onClick={() => setGraphType("KDE-plot")}>
          KDE-plot
        </MenuItem>
        <MenuItem value="Box-plot" onClick={() => setGraphType("Box-plot")}>
          Box-plot
        </MenuItem>
      </Select>

      {graphType === "Histogram" ? (
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={7} xl={5}>
            <Box
              sx={{
                width: "100%",
                height: "500px",
                display: "inline-block",
                bgcolor: "primary.light",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <Plot
                data={[
                  {
                    x: [...x_values],
                    type: "histogram",
                    marker: { color: "  #2a5a33" },
                  },
                ]}
                layout={{
                  yaxis: {
                    title: { text: "<b>Frequency<b>", standoff: 50 },
                  },
                  xaxis: { title: { text: `<b>${column}<b>`, standoff: 50 } },
                  title: "<b>Histogram<b>",
                }}
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <HistogramCode fileName={fileName} column={column} />
          </Grid>
        </Grid>
      ) : graphType === "KDE-plot" ? (
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={7} xl={5}>
            <Box
              sx={{
                width: "100%",
                height: "500px",
                display: "inline-block",
                bgcolor: "primary.light",
                borderRadius: 2,
                padding: 2,
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <BarGraphCode fileName={fileName} column={column} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={7} xl={5}>
            <Box
              sx={{
                width: "100%",
                height: "500px",
                display: "inline-block",
                bgcolor: "primary.light",
                borderRadius: 2,
                padding: 2,
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <BarGraphCode fileName={fileName} column={column} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default NumericColumn;
