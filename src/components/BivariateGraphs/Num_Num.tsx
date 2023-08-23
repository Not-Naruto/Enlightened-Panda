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
import BivariateOutliers from "./BivariateCode/BivariateOutliers";

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
      x.push(Number(row[col1]));
      y.push(Number(row[col2]));
    }
  }

  return { x, y };
}

function calculateBivariateOutliers(x: number[], y: number[]): any[] {
  const threshold = 2;

  const bivariateOutliers: any[] = [];

  const meanX = x.reduce((sum, value) => sum + value, 0) / x.length;
  const meanY = y.reduce((sum, value) => sum + value, 0) / y.length;

  const varianceX =
    x.reduce((sum, value) => sum + Math.pow(value - meanX, 2), 0) /
    (x.length - 1);
  const varianceY =
    y.reduce((sum, value) => sum + Math.pow(value - meanY, 2), 0) /
    (y.length - 1);

  const stdDevX = Math.sqrt(varianceX);
  const stdDevY = Math.sqrt(varianceY);

  for (let i = 0; i < x.length; i++) {
    const zScoreX = Math.abs((x[i] - meanX) / stdDevX);
    const zScoreY = Math.abs((y[i] - meanY) / stdDevY);

    if (zScoreX > threshold || zScoreY > threshold) {
      bivariateOutliers.push(1);
    }
  }
  return bivariateOutliers;
}

const Num_Num = ({ fileName, col1, col2, data }: Props) => {
  const [graphType, setGraphType] = useState("Scatter plot");
  const { x, y } = generateData(data, col1, col2);
  const outliers = calculateBivariateOutliers(x, y);

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
      <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
        Outliers
      </Typography>
      <BivariateOutliers fileName={fileName} col1={col1} col2={col2} />
      <Typography sx={{ marginTop: 3 }}>Outliers: {outliers.length}</Typography>
      {(outliers.length * 100) / x.length < 5 ? (
        <Typography>
          Percentage:{" "}
          <span style={{ color: "#3f834a" }}>
            {((outliers.length * 100) / x.length).toFixed(2)}%
          </span>
        </Typography>
      ) : (outliers.length * 100) / x.length < 20 ? (
        <Typography>
          Percentage:{" "}
          <span style={{ color: "#f48c06" }}>
            {((outliers.length * 100) / x.length).toFixed(2)}%
          </span>
        </Typography>
      ) : (
        <Typography>
          Percentage:{" "}
          <span style={{ color: "warning.main" }}>
            {((outliers.length * 100) / x.length).toFixed(2)}%
          </span>
        </Typography>
      )}
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
    </>
  );
};

export default Num_Num;
