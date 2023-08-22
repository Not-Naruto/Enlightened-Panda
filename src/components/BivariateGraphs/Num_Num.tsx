import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Plot from "react-plotly.js";
import BivariateScatterPlot from "./BivariateCode/BivariateScatterPlot";
import BivariateLinePlot from "./BivariateCode/BivariateLinePlot";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
  data: any[];
}

function generateData(
  data: any[],
  col1: string,
  col2: string
): { x: number[]; y: number[] } {
  const x: number[] = [];
  const y: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (Boolean(row[col1] && row[col2])) {
      x.push(parseFloat(row[col1]));
      y.push(parseFloat(row[col2]));
    }
  }

  return { x, y };
}

const Num_Num = ({ fileName, col1, col2, data }: Props) => {
  const [graphType, setGraphType] = useState("Scatter plot");
  const { x, y } = generateData(data, col1, col2);
  return (
    <>
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
        <MenuItem
          value="Scatter plot"
          onClick={() => setGraphType("Scatter plot")}
        >
          Scatter plot
        </MenuItem>
        <MenuItem value="Line Plot" onClick={() => setGraphType("Line Plot")}>
          Line Plot
        </MenuItem>
      </Select>
      {graphType === "Scatter plot" ? (
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
                    x: x,
                    y: y,
                    type: "scatter",
                    mode: "markers",
                    marker: { color: "  #2a5a33" },
                  },
                ]}
                layout={{
                  yaxis: {
                    title: { text: `<b>${col2}<b>`, standoff: 50 },
                  },
                  xaxis: { title: { text: `<b>${col1}<b>`, standoff: 50 } },
                  title: "<b>Scatter plot<b>",
                }}
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <BivariateScatterPlot fileName={fileName} col1={col1} col2={col2} />
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
            >
              <Plot
                data={[
                  {
                    x: x,
                    y: y,
                    type: "scatter",
                    mode: "lines",
                    marker: { color: "  #2a5a33" },
                  },
                ]}
                layout={{
                  yaxis: {
                    title: { text: `<b>${col2}<b>`, standoff: 50 },
                  },
                  xaxis: { title: { text: `<b>${col1}<b>`, standoff: 50 } },
                  title: "<b>Line plot<b>",
                }}
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <BivariateLinePlot fileName={fileName} col1={col1} col2={col2} />
          </Grid>
        </Grid>
      )}

      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
    </>
  );
};

export default Num_Num;
