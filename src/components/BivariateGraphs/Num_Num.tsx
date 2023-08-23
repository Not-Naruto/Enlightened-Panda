import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  MenuItem,
  Select,
  Typography,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import Plot from "react-plotly.js";
import BivariateScatterPlot from "./BivariateCode/BivariateScatterPlot";
import BivariateLinePlot from "./BivariateCode/BivariateLinePlot";
import BivariateOutliers from "./BivariateCode/BivariateOutliers";

import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import RelationshipCode from "./BivariateCode/RelationshipCode";

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

function calculateCovarianceAndCorrelation(
  x: number[],
  y: number[]
): { cov: number; cor: number } {
  if (x.length !== y.length) {
    throw new Error("Arrays x and y must have equal length");
  }

  const n = x.length;

  const meanX = x.reduce((sum, val) => sum + val, 0) / n;
  const meanY = y.reduce((sum, val) => sum + val, 0) / n;

  let covariance = 0;
  let xDeviationSquaredSum = 0;
  let yDeviationSquaredSum = 0;

  for (let i = 0; i < n; i++) {
    const xDeviation = x[i] - meanX;
    const yDeviation = y[i] - meanY;

    covariance += xDeviation * yDeviation;
    xDeviationSquaredSum += xDeviation ** 2;
    yDeviationSquaredSum += yDeviation ** 2;
  }

  const cov = covariance / n;
  const cor =
    covariance / Math.sqrt(xDeviationSquaredSum * yDeviationSquaredSum);

  return { cov, cor };
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
  const { cov, cor } = calculateCovarianceAndCorrelation(x, y);
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
        Relationship
      </Typography>
      <RelationshipCode fileName={fileName} col1={col1} col2={col2} />

      <List>
        <ListItem key={"cov"}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.dark" }}>
              <LabelImportantIcon sx={{ color: "#c1d4c6" }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography>
                <strong>Covariance:</strong> {cov.toFixed(4)}
              </Typography>
            }
          />
        </ListItem>
        <ListItem key={"cor"}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.dark" }}>
              <LabelImportantIcon sx={{ color: "#c1d4c6" }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography>
                <strong>Correlation:</strong> {cor.toFixed(4)}
              </Typography>
            }
          />
        </ListItem>
      </List>
      {cor < -0.85 ? (
        <Typography sx={{ color: "#3f834a", marginX: 3 }}>
          Strong Negative Relation
        </Typography>
      ) : cor < -0.5 ? (
        <Typography sx={{ color: "#f48c06", marginX: 3 }}>
          Moderate Negative Relation
        </Typography>
      ) : cor < 0 ? (
        <Typography sx={{ color: "error.main", marginX: 3 }}>
          Weak Negative Relation
        </Typography>
      ) : cor < 0.5 ? (
        <Typography sx={{ color: "error.main", marginX: 3 }}>
          Weak Positive Relation
        </Typography>
      ) : cor < 0.85 ? (
        <Typography sx={{ color: "#f48c06", marginX: 3 }}>
          Moderate Positive Relation
        </Typography>
      ) : (
        <Typography sx={{ color: "#3f834a", marginX: 3 }}>
          Strong Positive Relation
        </Typography>
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
          <span style={{ color: "error.main" }}>
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
