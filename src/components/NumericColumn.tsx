import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Plot from "react-plotly.js";
import HistogramCode from "./ColumnCode/HistogramCode";
import BoxPlotCode from "./ColumnCode/BoxPlotCode";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import MissingColumnCode from "./MissingCode/MissingColumnCode";
import StatisticCode from "./ColumnCode/StatisticCode";

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

function generateMissing(
  data: { [key: string]: any }[],
  column: string
): {
  missing: number;
  total: number;
} {
  let missing = 0;
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i][column].trim()) {
    } else {
      missing++;
    }
    total++;
  }

  return { missing, total };
}

function calculateStatistics(numbers: number[]): {
  mean: number;
  median: number;
  mode: number;
  stdDeviation: number;
  variance: number;
} {
  const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;

  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);
  const median =
    sortedNumbers.length % 2 === 0
      ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
      : sortedNumbers[middleIndex];

  const numCountMap: { [key: number]: number } = {};
  numbers.forEach((num) => {
    numCountMap[num] = (numCountMap[num] || 0) + 1;
  });
  let mode: number = numbers[0];
  let maxCount = 0;
  for (const num in numCountMap) {
    if (numCountMap[num] > maxCount) {
      maxCount = numCountMap[num];
      mode = +num;
    }
  }

  const squaredDifferences = numbers.map((num) => Math.pow(num - mean, 2));
  const variance =
    squaredDifferences.reduce((sum, diff) => sum + diff, 0) / numbers.length;
  const stdDeviation = Math.sqrt(variance);

  return { mean, median, mode, stdDeviation, variance };
}

const NumericColumn = ({ fileName, data, column }: Props) => {
  const [graphType, setGraphType] = useState("Histogram");
  const x_values = generateX(data, column);
  const { mean, median, mode, stdDeviation, variance } =
    calculateStatistics(x_values);

  const numberOfBins = Math.round(
    (Math.max(...x_values) - Math.min(...x_values)) *
      (x_values.length ** 0.3 / (3.49 * stdDeviation))
  );

  const { missing, total } = generateMissing(data, column);

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
                    xbins: {
                      start: Math.min(...x_values) - 1,
                      end: Math.max(...x_values) + 1,
                      size: Math.round(
                        (Math.max(...x_values) - Math.min(...x_values)) /
                          numberOfBins
                      ),
                    },
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
                    y: [...x_values],
                    type: "box",
                    marker: { color: "  #2a5a33" },
                    name: column,
                  },
                ]}
                layout={{
                  title: "<b>Box-plot<b>",
                }}
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <BoxPlotCode fileName={fileName} column={column} />
          </Grid>
        </Grid>
      )}
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
      <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
        Statistical values
      </Typography>

      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <List>
            <ListItem key="mean">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.dark" }}>
                  <LabelImportantIcon sx={{ color: "#c1d4c6" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography>
                    <strong>Mean:</strong> {mean.toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem key="median">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.dark" }}>
                  <LabelImportantIcon sx={{ color: "#c1d4c6" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography>
                    <strong>Median:</strong> {median.toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem key="mode">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.dark" }}>
                  <LabelImportantIcon sx={{ color: "#c1d4c6" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography>
                    <strong>Mode:</strong> {mode.toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem key="stdDeviation">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.dark" }}>
                  <LabelImportantIcon sx={{ color: "#c1d4c6" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography>
                    <strong>Standard Deviation:</strong>{" "}
                    {stdDeviation.toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem key="variance">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.dark" }}>
                  <LabelImportantIcon sx={{ color: "#c1d4c6" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography>
                    <strong>Variance:</strong> {variance.toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={8} xl={6}>
          <StatisticCode fileName={fileName} column={column} />
        </Grid>
      </Grid>

      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
      <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
        Missing Values
      </Typography>
      <MissingColumnCode fileName={fileName} column={column} />
      <Typography sx={{ marginTop: 3 }}>
        Missing values in {column}: {missing}
      </Typography>

      {(missing * 100) / total < 5 ? (
        <Typography>
          Percentage:{" "}
          <span style={{ color: "#3f834a" }}>
            {((missing * 100) / total).toFixed(2)}%
          </span>
        </Typography>
      ) : (missing * 100) / total < 20 ? (
        <>
          <Typography>
            Percentage:{" "}
            <span style={{ color: "#f48c06" }}>
              {((missing * 100) / total).toFixed(2)}%
            </span>
          </Typography>
          <Typography sx={{ color: "warning.main", marginTop: 2 }}>
            Consider Imputing Missing Values with Mode or a new 'Missing' value
          </Typography>
        </>
      ) : (
        <>
          <Typography>
            Percentage:{" "}
            <span style={{ color: "#e5383b" }}>
              {((missing * 100) / total).toFixed(2)}%
            </span>
          </Typography>
          <Typography sx={{ color: "error.main", marginTop: 2 }}>
            Consider Dropping the column due to excessive missing values
          </Typography>
        </>
      )}
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
    </Box>
  );
};

export default NumericColumn;
