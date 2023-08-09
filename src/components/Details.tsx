import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Overview from "./Overview";
import CategoricalColumn from "./CategoricalColumn";
import NumericColumn from "./NumericColumn";

interface Props {
  data: any[];
  file: File;
}

function getDataType(variable: string) {
  try {
    return typeof eval(variable.toLowerCase());
  } catch {
    return "string";
  }
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
      ) : getDataType(data[0][selected]) === "number" ? (
        <NumericColumn data={data} column={selected} fileName={file.name} />
      ) : (
        <CategoricalColumn data={data} column={selected} fileName={file.name} />
      )}
    </>
  );
};

export default Details;
