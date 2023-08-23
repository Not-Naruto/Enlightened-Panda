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
import BivariateHistogram from "./BivariateCode/BivariateHistogram";
import BivariateBoxPlot from "./BivariateCode/BivariateBoxPlot";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { calculateStatistics } from "../NumericColumn";
import GroupedStatistics from "./BivariateCode/GroupedStatistics";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
  data: any[];
}

const generateX = (data: any[], col1: string, col2: string) => {
  const output: any = {};

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!Boolean(row[col2])) {
    } else if (row[col1].trim() in output) {
      output[row[col1].trim()].push(Number(row[col2]));
    } else {
      output[row[col1].trim()] = [Number(row[col2])];
    }
  }

  delete output[""];
  return output;
};

const generateDataHist = (x_values: any) => {
  const data: any[] = [];
  Object.keys(x_values).forEach((trace) => {
    data.push({
      x: x_values[trace],
      type: "histogram",
      autobinx: true,
      opacity: 0.5,
      name: trace,
    });
  });

  return data;
};

const generateDataBox = (x_values: any) => {
  const data: any[] = [];
  Object.keys(x_values).forEach((trace) => {
    data.push({
      y: x_values[trace],
      type: "box",
      name: trace,
      jitter: 0.1,
    });
  });

  return data;
};

const Cat_Num = ({ fileName, col1, col2, data }: Props) => {
  const [graphType, setGraphType] = useState("Histogram");

  const x_values = generateX(data, col1, col2);
  var i = 0;
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
                data={generateDataHist(x_values)}
                layout={{
                  yaxis: {
                    title: { text: "<b>Frequency<b>", standoff: 50 },
                  },
                  xaxis: { title: { text: `<b>Value<b>`, standoff: 50 } },
                  title: "<b>Histogram<b>",
                  barmode: "overlay",
                }}
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <BivariateHistogram
              fileName={fileName}
              col1={col1}
              col2={col2}
              values={Object.keys(x_values)}
            />
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
                data={generateDataBox(x_values)}
                layout={{
                  title: "<b>Box-plot<b>",
                  xaxis: {
                    title: `<b>${col1}</b>`,
                  },
                  yaxis: {
                    title: `<b>${col2}</b>`,
                  },
                }}
                config={{ responsive: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5} xl={6}>
            <BivariateBoxPlot fileName={fileName} col1={col1} col2={col2} />
          </Grid>
        </Grid>
      )}
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
      <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
        Grouped Statistical Values
      </Typography>

      <GroupedStatistics fileName={fileName} col1={col1} col2={col2} />

      <Grid container spacing={2}>
        {Object.keys(x_values).map((item) => {
          const { mean, median, mode, stdDeviation, variance } =
            calculateStatistics(x_values[item]);
          i += 5;
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              xl={3}
              sx={{ marginTop: 3 }}
              key={item}
            >
              <Typography variant="h5">
                {col1}-{item}
              </Typography>
              <List>
                <ListItem key={`mean-${item}`}>
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
                <ListItem key={`median-${item}`}>
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
                <ListItem key={`mode-${item}`}>
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
                <ListItem key={`stdDeviation-${item}`}>
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
                <ListItem key={`variance-${item}`}>
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
          );
        })}
      </Grid>
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
    </>
  );
};

export default Cat_Num;
