import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import csvIcon from "../assets/csv.png";
import { useRef, useState } from "react";

const FileInput = () => {
  const FileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const selectFile = () => {
    FileInputRef.current?.click();
  };

  function onFileSelect(e: any) {
    if (e.target.files[0].type.split("/")[1] != "csv") {
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
    <>
      <Typography variant="h2">Hello World</Typography>

      <Box
        sx={{
          backgroundColor: "background.paper",
          margin: "0 auto",
          height: "50%",
          width: { xs: "80%", md: "60%", lg: "40%" },
          borderRadius: 10,
          display: "flex",
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.default",
            height: "90%",
            width: "90%",
            margin: "auto",
            border: `dashed`,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Stack sx={{ justifyItems: "center" }} spacing={2}>
            <img src={csvIcon} width={"100px"} style={{ margin: "0 auto" }} />
            <Typography variant="h5" textAlign={"center"}>
              Drag csv file here to upload
            </Typography>
            <Divider
              sx={{
                "&::before, &::after": {
                  borderColor: "text.primary",
                },
              }}
            >
              <Typography variant="h5" color="text.primary">
                OR
              </Typography>
            </Divider>
            <input
              name="file"
              type="file"
              id="file"
              style={{ display: "none" }}
              ref={FileInputRef}
              onChange={onFileSelect}
            />
            <Button variant="outlined" onClick={selectFile}>
              <strong>Browse</strong>
            </Button>
            {error && (
              <Alert
                severity="error"
                variant="outlined"
                sx={{ backgroundColor: "error.dark", color: "#C29A9A" }}
              >
                <AlertTitle>Error</AlertTitle>
                Please select a <strong>CSV</strong> file
              </Alert>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default FileInput;
