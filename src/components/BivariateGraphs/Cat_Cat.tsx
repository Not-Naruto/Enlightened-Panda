import { Box, Divider, Grid, Typography } from "@mui/material";
import Plot from "react-plotly.js";
import BivariateBar from "./BivariateCode/BivariateBar";

interface Props {
  fileName: string;
  col1: string;
  col2: string;
  data: any[];
}

const generateX = (data: any[], col1: string, col2: string) => {
  const output: any[] = [];
  var x1: any[] = [];
  var x2: any[] = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    x1.push(row[col1].trim());
    x2.push(row[col2].trim());
  }
  x1 = [...new Set(x1)].filter((a) => a !== "");
  x2 = [...new Set(x2)].filter((a) => a !== "");

  for (let i = 0; i < x2.length; i++) {
    const py: number[] = [];
    for (let i = 0; i < x1.length; i++) {
      py.push(0);
    }

    const px = data.filter((row) => row[col2].trim() === x2[i]);
    for (let i = 0; i < px.length; i++) {
      const row = px[i];
      let idx = x1.indexOf(row[col1]);
      py[idx] += 1;
    }

    output.push({
      x: x1,
      y: py,
      type: "bar",
      name: x2[i],
    });
  }

  return output;
};

const Cat_Cat = ({ fileName, col1, col2, data }: Props) => {
  return (
    <>
      <Typography sx={{ my: 5, color: "primary.light" }} variant="h3">
        Graph
      </Typography>
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
              data={generateX(data, col1, col2)}
              layout={{
                yaxis: {
                  title: { text: "<b>Frequency<b>", standoff: 50 },
                },
                xaxis: { title: { text: `<b>${col1}<b>`, standoff: 50 } },
                title: "<b>Count Plot<b>",
              }}
              config={{ responsive: true }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5} xl={6}>
          <BivariateBar fileName={fileName} col1={col1} col2={col2} />
        </Grid>
      </Grid>
      <Divider
        variant="middle"
        sx={{ my: 5, bgcolor: "text.primary" }}
      ></Divider>
    </>
  );
};

export default Cat_Cat;
