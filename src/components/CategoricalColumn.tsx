import { Box, Divider, Typography } from "@mui/material";
import { Datum } from "plotly.js";
import Plot from "react-plotly.js";

interface Props {
  data: { [key: string]: any }[];
  column: string;
}

const generate_XY = (data: { [key: string]: any }[], column: string) => {
  const info: any = {};
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    if (row[column] in info) {
      info[row[column]] = info[row[column]] + 1;
    } else {
      info[row[column]] = 1;
    }
  }
  delete info[""];
  let x: String[] = [];
  let y: Number[] = [];

  Object.keys(info).forEach((value) => {
    x.push(value);
    y.push(info[value]);
  });
  return [x, y];
};

const CategoricalColumn = ({ data, column }: Props) => {
  const info = generate_XY(data, column);
  const x_values = info[0] as Datum[];
  const y_values = info[1] as Datum[];
  return (
    <>
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
        <Box
          sx={{
            display: "inline-block",
            bgcolor: "primary.light",
            padding: 3,
          }}
        >
          <Plot
            data={[
              {
                x: [...x_values],
                y: [...y_values],
                type: "bar",
                mode: "lines+markers",
                marker: { color: "  #2a5a33" },
              },
            ]}
            layout={{
              yaxis: {
                title: { text: "<b>Frequency<b>", standoff: 50 },
              },
              xaxis: { title: { text: `<b>${column}<b>`, standoff: 50 } },
              title: "<b>Frequency Graph<b>",
            }}
          />
          ;
        </Box>
      </Box>
    </>
  );
};

export default CategoricalColumn;
