import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Overview from "./Overview";

interface Props {
  data: any[];
  file: File;
}

const Details = ({ data, file }: Props) => {
  const [selected, setSelected] = useState<any>("Overview");
  const columns = Object.keys(data[0]);

  return (
    <>
      <Select
        sx={{
          overflow: "hidden",
          borderRadius: "15px",
          mx: 5,
          marginTop: 3,
          height: "40px",
          width: "200px",
          bgcolor: "primary.light",
        }}
        value={selected}
      >
        <MenuItem value="Overview" onClick={() => setSelected("Overview")}>
          Table Overview
        </MenuItem>

        {columns.map((col) => (
          <MenuItem key={col} value={col} onClick={() => setSelected(`${col}`)}>
            {col}
          </MenuItem>
        ))}
      </Select>

      {selected === "Overview" ? (
        <Overview data={data} file={file} />
      ) : (
        <div>Something Else</div>
      )}
    </>
  );
};

export default Details;
