import { Box, Typography } from "@mui/material";

interface Props {
  colorMode: string;
}

const FileInput = ({ colorMode }: Props) => {
  return (
    <>
      <Typography variant="h2">Hello World</Typography>
      <Box
        sx={{
          width: "40%",
          height: "50%",
          margin: "0 auto",
          border: `dashed`,
          borderRadius: 5,
        }}
      ></Box>
    </>
  );
};

export default FileInput;
