import React, { ReactElement, useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { withSSRContext, API } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import {
  GetPostQuery,
  ListPostsQuery,
  Post,
  CreateCommentInput,
  CreateCommentMutation,
  Comment,
} from "../../API";
import PostPreview from "../../components/PostPreview";
import { Container } from "@mui/system";
import PostComment from "./../../components/Comment";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Grid, TextField } from "@mui/material";
import { createComment } from "../../graphql/mutations";

interface Props {
  post: Post;
}

interface IFormInput {
  comment: string;
}

export default function IndividualPost({ post }: Props): ReactElement {
  const [comments, setComments] = useState<Comment[]>(
    post.comments.items as Comment[]
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const newCommentInput: CreateCommentInput = {
      postID: post.id,
      content: data.comment,
    };
    // Add comment
    const createNewComment = (await API.graphql({
      query: createComment,
      variables: { input: newCommentInput },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as { data: CreateCommentMutation };
    setComments([...comments, createNewComment.data.createComment as Comment]);
  };

  console.log("Post: ", post);

  return (
    <Container maxWidth="md">
      <PostPreview post={post} />
      {/* Add Comments */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        style={{ marginTop: 32, marginBottom: 32 }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <TextField
              id="comment"
              label="New Comment"
              // variant="outlined"
              multiline
              fullWidth
              style={{ border: "1px solid #666666" }}
              error={errors.comment ? true : false}
              type="text"
              helperText={errors.comment ? errors.comment.message : null}
              {...register("comment", {
                required: { value: true, message: "Please enter a comment" },
                maxLength: {
                  value: 240,
                  message: "Please enter a comment under 240 characters",
                },
              })}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Add comment
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Comments */}
      {/* TODO sort commenst by createdDate */}
      {comments &&
        comments
          ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((comment) => <PostComment key={comment.id} comment={comment} />)}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();
  const postsQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params.id,
    },
  })) as { data: GetPostQuery };

  return {
    props: {
      post: postsQuery.data.getPost as Post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();

  const response = (await SSR.API.graphql({
    query: listPosts,
  })) as {
    data: ListPostsQuery;
    errors: any[];
  };

  const paths = response.data.listPosts.items.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: "blocking", // server-render pages on-demand if the path doesn't exist
  };
};
