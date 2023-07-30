import { Button, Typography } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useState } from "react";

interface Props {
  fileName: string;
}

const DataTypesCode = ({ fileName }: Props) => {
  const [copy, setCopy] = useState(false);

  const codeString = `import pandas as pd 
  
df = pd.read_csv("${fileName}") 
print(df.dtypes)`;

  const handleClick = () => {
    navigator.clipboard.writeText(codeString);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          background: "#3a404d",
        }}
      >
        <Typography variant="subtitle2" sx={{ margin: 0, padding: "5px 10px" }}>
          Example Code
        </Typography>
        {copy ? (
          <Button
            sx={{
              color: "inherit",
              margin: 0,
              padding: "0 10px",
              textTransform: "capitalize",
            }}
          >
            <DoneAllIcon
              fontSize="small"
              sx={{ margin: 0, padding: 0, color: "white" }}
            />
            <Typography
              variant="subtitle2"
              sx={{ margin: 0, padding: "5px 10px 5px 5px" }}
            >
              Copied!
            </Typography>
          </Button>
        ) : (
          <Button
            sx={{
              color: "inherit",
              margin: 0,
              padding: "0 10px",
              textTransform: "capitalize",
            }}
            onClick={handleClick}
          >
            <ContentCopyOutlinedIcon
              fontSize="small"
              sx={{ margin: 0, padding: 0, color: "white" }}
            />
            <Typography
              variant="subtitle2"
              sx={{ margin: 0, padding: "5px 10px 5px 5px" }}
            >
              Copy
            </Typography>
          </Button>
        )}
      </div>
      <SyntaxHighlighter
        language="python"
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: "10px",
        }}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default DataTypesCode;
