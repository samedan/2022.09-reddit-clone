import React from "react";
import { ReactElement, useState } from "react";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Grid, Snackbar, Alert, Button } from "@mui/material";
import ImageDropzone from "../components/ImageDropzone";
import { API, Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { createPost } from "./../graphql/mutations";
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostMutationVariables,
} from "../API";
import { useRouter } from "next/router";

// interface Props {}
interface IFormInput {
  title: string;
  content: string;
  image?: string;
}

// eslint-disable-next-line no-empty-pattern
export default function Create(): ReactElement {
  const [file, setFile] = useState<File>();

  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (file) {
      // user uploaded file
      const imagePath = uuidv4();
      // send to S3 bucket
      try {
        await Storage.put(imagePath, file, { contentType: file.type });
        // once the Image is uploaded
        // const createNewPostMutationVariables: CreatePostMutationVariables;
        const createNewPostInput: CreatePostInput = {
          title: data.title,
          contents: data.content,
          image: imagePath,
          // createdAt, updatedAt, owner, votes
        };
        const createNewPost = (await API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as { data: CreatePostMutation };
        console.log("New Post created successfully: ", createNewPost);
        router.push(`/post/${createNewPost.data.createPost.id}`);
      } catch (error) {
        console.log("error uploading file: ", error);
      }
    } else {
      const createNewPostWithoutImageInput: CreatePostInput = {
        title: data.title,
        contents: data.content,
        // createdAt, updatedAt, owner; votes
      };
      const createNewPostWithoutImage = (await API.graphql({
        query: createPost,
        variables: { input: createNewPostWithoutImageInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: CreatePostMutation };
      console.log("New Post created successfully: ", createNewPostWithoutImage);
      router.push(`/post/${createNewPostWithoutImage.data.createPost.id}`);
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
