import React from "react";
import { ReactElement, useState } from "react";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Grid, Snackbar, Alert, Button } from "@mui/material";
import ImageDropzone from "../components/ImageDropzone";
import { Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";

interface Props {}
interface IFormInput {
  title: string;
  content: string;
  image?: string;
}

export default function Create({}: Props): ReactElement {
  const [file, setFile] = useState<File>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (file) {
      // user uploaded file
      // send to S3 bucket
      try {
        await Storage.put(
          uuid(),
          file
          // , {  contentType:  }
        );
      } catch (error) {
        console.log("error uploading file: ", error);
      }
    }

    console.log(file);
    console.log(data);
  };

  console.log("current file (as the parent is aware) is: ", file);

  return (
    <Container maxWidth="md">
      {/* Create a form  */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={2} direction="column">
          {/* Title */}
          <Grid item>
            <TextField
              id="title"
              label="Post Title"
              variant="outlined"
              error={errors.title ? true : false}
              type="text"
              fullWidth
              helperText={errors.title ? errors.title.message : null}
              {...register("title", {
                required: { value: true, message: "Please enter a title" },
                maxLength: {
                  value: 120,
                  message:
                    "Please enter a title that is 120 characters or less",
                },
              })}
            />
          </Grid>
          {/* Contents */}
          <Grid item>
            <TextField
              id="content"
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              error={errors.content ? true : false}
              type="text"
              helperText={errors.content ? errors.content.message : null}
              {...register("content", {
                required: {
                  value: true,
                  message: "Please enter some content for your post.",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Please make sure your content is 1000 characters or less",
                },
              })}
            />
          </Grid>
          {/* Optional */}
          <Grid item>
            <ImageDropzone file={file} setFile={setFile} />
          </Grid>

          {/* Button */}
          <Grid item>
            <Button variant="contained" type="submit">
              Create post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
