import {
  Box,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  data: any[];
  file: any;
}

const ComparisonComponent = ({ data, file }: Props) => {
  const [col1, setCol1] = useState<string>("");
  const [col2, setCol2] = useState<string>("");

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
        <Grid item xs={12} md={6}>
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
            <MenuItem key={""} value={""} onClick={() => setCol1("")}>
              {""}
            </MenuItem>
            {columns.map((col) => (
              <MenuItem key={col} value={col} onClick={() => setCol1(`${col}`)}>
                {col}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
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
      </Grid>
    </Box>
  );
};

export default ComparisonComponent;
