import React, { ReactElement, useState, useEffect } from "react";
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
import formatDatePosted from "../lib/formatDatePosted";
import { Storage } from "aws-amplify";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const router = useRouter();
  const [postImage, setPostImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getImageFromStorage() {
      try {
        const signedURL = await Storage.get(post.image); // get key form Storage.list*
        console.log("signedURL ", signedURL);
        setPostImage(signedURL);
      } catch (error) {
        console.log("No image");
      }
    }
    console.log("post.image", post.image);
    if (post.image !== null) {
      getImageFromStorage();
    } else {
      setPostImage(null);
    }
  }, []);

  return (
    <>
      <Paper elevation={3}>
        {/* @ts-ignore */}
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
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ backgroundColor: "#0a0a0a", color: "#333333" }}
            >
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
          <Grid container>
            <ButtonBase
              onClick={() => router.push(`/post/${post.id}`)}
              style={{ maxWidth: "90%" }}
            >
              <Grid item style={{ maxWidth: "90%" }}>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography variant="body1">
                      Posted {formatDatePosted(post.createdAt)} by{" "}
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
                  {postImage && (
                    <Grid item>
                      <Image
                        src={postImage}
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
        </Grid>
      </Paper>
    </>
  );
}
