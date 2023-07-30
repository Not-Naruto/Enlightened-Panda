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
import Papa from "papaparse";

interface Props {
  setData: (data: any[]) => void;
  setLoading: (l: boolean) => void;
  setFile: (res: File) => void;
}

const FileInput = ({ setData, setLoading, setFile }: Props) => {
  const FileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = () => {
    FileInputRef.current?.click();
  };

  function onFileSelect(e: any) {
    const file = e.target.files[0];
    if (file.type.split("/")[1] != "csv") {
      setError(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      setError(false);
      parseFile(file);
    }
  }

  const parseFile = (file: any) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setFile(file);
        setData(results.data);
      },
    });
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file.type.split("/")[1] != "csv") {
      setError(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      parseFile(file);
    }
  };

  return (
    <>
      <Typography variant="h3" sx={{ margin: "20px", textAlign: "center" }}>
        Upload csv file to get started
      </Typography>

      <Box
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        sx={{
          backgroundColor: "background.paper",
          margin: "0 auto",
          height: "50%",
          maxHeight: "580px",
          minHeight: "380px",
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
          {isDragging ? (
            <Typography>Drop Files Here</Typography>
          ) : (
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
                accept=".csv"
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
          )}
        </Box>
      </Box>
    </>
  );
};

export default FileInput;
