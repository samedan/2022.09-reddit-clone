import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Grid } from "@mui/material";

interface Props {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File>>;
}

export default function ImageDropzone({ file, setFile }: Props) {
  // const [file, setFile] = useState<string>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      // setFile(
      //   acceptedFiles.map((file) =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //     })
      //   )
      // );
      // setFile(URL.createObjectURL(acceptedFiles[0]));
      setFile(acceptedFiles[0]);
    },
  });

  // Preview of the Image
  // const thumbs = files.map((file) => (
  //   <div
  //     key={file.name}
  //     sx={{
  //       display: "inline-flex",
  //       borderRadius: 2,
  //       border: "1px solid #eaeaea",
  //       marginBottom: 8,
  //       marginRight: 8,
  //       width: 100,
  //       height: 100,
  //       padding: 4,
  //       boxSizing: "border-box",
  //     }}
  //   >
  //     <div sx={{ display: "flex", minWidth: 0, overflow: "hidden" }}>
  //       <img
  //         src={file.preview}
  //         // style={img}
  //         sx={{ display: "block", width: "auto", height: "100%" }}
  //         // Revoke data uri after image is loaded
  //         onLoad={() => {
  //           URL.revokeObjectURL(file.preview);
  //         }}
  //       />
  //     </div>
  //   </div>
  // ));

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   // return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   return () => (file) => URL.revokeObjectURL(file);
  // }, [file]);

  console.log("current file is: ", file);
  return (
    <>
      {!file ? (
        <div
          className="container"
          style={{
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "#FFF",
            padding: 5,
          }}
        >
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Typography variant="body1">
              Drag and drop the image you choose for your post
            </Typography>
          </div>
          {/* <aside
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 16,
            }}
          > */}
          {/* {thumbs} */}

          {/* </aside> */}
        </div>
      ) : (
        <>
          <Grid
            container
            alignItems="center"
            // justify="center"
            direction="column"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h6">Your Image:</Typography>
            </Grid>
            <Grid item>
              <img
                src={URL.createObjectURL(file)}
                style={{ width: "auto", maxWidth: 200 }}
                alt="your image"
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
