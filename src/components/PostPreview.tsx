import React, { ReactElement } from "react";
import { Post } from "../API";
import { ButtonBase, Grid } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const router = useRouter();

  const convertDateToElapsed = (date: string): string => {
    const now = new Date(Date.now());
    const current = new Date(date);
    const diff = now.getTime() - current.getTime();
    console.log("diff", diff / 1000 / 60);
    if (diff / 1000 / 60 < 60) {
      return (diff / 1000 / 60).toFixed(0) + " minutes ago";
    }
    return (diff / 1000 / 60 / 60).toFixed(0) + " hours ago";
  };

  return (
    <>
      <Paper elevation={3}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          wrap="nowrap"
          spacing={3}
          style={{ padding: 24, marginTop: 24 }}
        >
          {/* // Votes */}
          <Grid item style={{ maxWidth: 128 }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <IconButton color="inherit">
                  <ArrowUpwardIcon style={{ maxWidth: 16 }} />
                </IconButton>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" direction="column">
                  <Grid item>
                    <Typography variant="h6">
                      {(post.upvotes - post.downvotes).toString()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">votes</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton color="inherit">
                  <ArrowDownwardIcon style={{ maxWidth: 16 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* Content Post Preview*/}
          <ButtonBase onClick={() => router.push(`/post/${post.id}`)}>
            <Grid item style={{ maxWidth: "70%" }}>
              <Grid container direction="column" alignItems="flex-start">
                <Grid item>
                  <Typography variant="body1">
                    Posted {convertDateToElapsed(post.createdAt)} by{" "}
                    <b>{post.owner}</b>
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="h2">{post.title}</Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    maxHeight: 32,
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <Typography variant="body1">{post.contents}</Typography>
                </Grid>
                {!post.image && (
                  <Grid item>
                    <Image
                      src={`https://source.unsplash.com/random/980x540`}
                      height={200}
                      width={400}
                      layout="intrinsic"
                      alt="image"
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </ButtonBase>
        </Grid>
      </Paper>
    </>
  );
}
