/* eslint-disable react/prop-types */
import React, { ReactElement, useState, useEffect } from "react";
import {
  CreateVoteInput,
  CreateVoteMutation,
  Post,
  UpdateVoteInput,
  UpdateVoteMutation,
} from "../API";
import { Alert, ButtonBase, Grid, Snackbar } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useRouter } from "next/router";
import formatDatePosted from "../lib/formatDatePosted";
import { Storage, API, Auth } from "aws-amplify";
import { createVote, updateVote } from "../graphql/mutations";
import { useUser } from "../context/AuthContext";

// interface Props {
//   post: Post;
// }

// eslint-disable-next-line react/prop-types
export default function PostPreview({ post }) {
  const router = useRouter();
  const [postImage, setPostImage] = useState<string | undefined>(undefined);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [createAccountMessage, setCreateAccountMessage] = useState(false);
  const [existingVote, setExistingVote] = useState<string | undefined>(
    undefined
  );
  const [existingVoteId, setExistingVoteId] = useState<string | undefined>(
    undefined
  );
  const [upvotes, setUpvotes] = useState<number>(
    // eslint-disable-next-line react/prop-types
    post.votes.items
      ? post.votes.items.filter((v) => v.vote === "upvote").length
      : 0
  );
  const [downvotes, setDownvotes] = useState<number>(
    // eslint-disable-next-line react/prop-types
    post.votes.items
      ? post.votes.items.filter((v) => v.vote === "downvote").length
      : 0
  );

  const { user } = useUser(); // user from Context

  // format username: 2440be86-f7f8-46e5-bf55-2af0607b49d3::dpopescu
  // async function checkUser() {
  //   const awsUser = await Auth.currentAuthenticatedUser();
  //   const userName = `${awsUser.attributes.sub}::${awsUser.username}`;
  //   console.log("userName", userName);
  //   // console.log("awsUser", awsUser);
  //   // setUser(awsUser);
  // }

  // check for Existing Vote
  useEffect(() => {
    if (user) {
      // const userNameFromContext = `${user?.attributes?.sub}::${user.username}`;
      // console.log("userNameFromContext", userNameFromContext);

      // console.log("userName", userName);
      const tryFindVote = post.votes.items?.find(
        // createdBy = 2440be86-f7f8-46e5-bf55-2af0607b49d3::dpopescu
        //
        (v) => v.createdBy === user.getUsername() && v.postID === post.id
        // (v) => {
        //   console.log("v.createdBy", v.createdBy);

        //   v.createdBy === userNameFromContext;
        // }
      );
      console.log("tryFindVote", tryFindVote);
      if (tryFindVote) {
        setExistingVote(tryFindVote.vote);
        setExistingVoteId(tryFindVote.id);
      }
    }
  }, [user, post.votes.items]);

  // Post Image
  useEffect(() => {
    async function getImageFromStorage() {
      try {
        const signedURL = await Storage.get(post.image); // get key form Storage.list*
        // console.log("signedURL ", signedURL);
        setPostImage(signedURL);
      } catch (error) {
        // console.log("No image");
      }
    }
    // console.log("post.image", post.image);
    if (post.image !== null) {
      getImageFromStorage();
    } else {
      setPostImage(null);
    }
  }, []);

  const addVote = async (voteType: string) => {
    if (user) {
      console.log("existingVote: ", existingVote);
      if (existingVote && existingVote !== voteType) {
        // if changing the vote
        const updateVoteInput: UpdateVoteInput = {
          id: existingVoteId,
          vote: voteType,
          postID: post.id,
        };
        // updateVote rather than create vote
        const updateVoteCount = (await API.graphql({
          query: updateVote,
          variables: { input: updateVoteInput },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as { data: UpdateVoteMutation };

        if (voteType === "upvote") {
          setUpvotes(upvotes + 1);
          // setDownvotes(downvotes - 1);
        }
        if (voteType === "downvote") {
          // setUpvotes(upvotes - 1);
          setDownvotes(downvotes + 1);
        }
        setExistingVote(voteType);
        console.log("existingVote", voteType);
        setExistingVoteId(updateVoteCount.data.updateVote.id);
        console.log("updated vote: ", updateVoteCount);
      } else if (existingVote && existingVote === voteType) {
        console.log("You already voted: ", existingVote);
        setSnackbarVisible(true);
      }
      // if existing vote
      else if (!existingVote) {
        // NEW Vote, not existing vote
        const createNewVoteInput: CreateVoteInput = {
          vote: voteType,
          postID: post.id,
        };
        // create vote for this post
        const createNewVote = (await API.graphql({
          query: createVote,
          variables: { input: createNewVoteInput },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as { data: CreateVoteMutation };

        if (createNewVote.data.createVote.vote === "downvote") {
          setDownvotes(downvotes + 1);
        }
        if (createNewVote.data.createVote.vote === "upvote") {
          setUpvotes(upvotes + 1);
        }
        setExistingVote(createNewVote.data.createVote.vote);
        setExistingVoteId(createNewVote.data.createVote.id);

        console.log("created vote ", createNewVote);
      }
    } else {
      setCreateAccountMessage(true);
    }
  };

  return (
    <>
      {createAccountMessage && (
        <Snackbar
          open={createAccountMessage}
          autoHideDuration={3000}
          // onClose={handleClose}
          onClose={() => setCreateAccountMessage(false)}
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            Login or Signup to create or vote on a post
          </Alert>
        </Snackbar>
      )}
      {snackbarVisible && (
        <Snackbar
          open={snackbarVisible}
          autoHideDuration={3000}
          // onClose={handleClose}
          onClose={() => setSnackbarVisible(false)}
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            You already voted{" "}
            <span style={{ color: "red" }}>{existingVote}</span> for this post
          </Alert>
        </Snackbar>
      )}
      <Paper elevation={3}>
        <>
          <Grid
            container
            direction="row"
            // justify="flex-start"
            alignItems="flex-start"
            wrap="nowrap"
            spacing={3}
            style={{ padding: 24, marginTop: 24 }}
          >
            <Grid item style={{ maxWidth: 128 }}>
              {/* // Votes */}
              <Grid
                container
                direction="column"
                alignItems="center"
                style={{ backgroundColor: "#0a0a0a", color: "#333333" }}
              >
                <Grid item>
                  <IconButton
                    color="inherit"
                    onClick={() => addVote("upvote")}
                    style={{
                      color: existingVote === "upvote" ? "green" : "white",
                    }}
                  >
                    <ArrowUpwardIcon style={{ maxWidth: 16 }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" direction="column">
                    <Grid item>
                      <Typography variant="h6" style={{ color: "white" }}>
                        {/* {(post.upvotes - post.downvotes).toString()} */}
                        {/* {post.votes.items.filter((v) => v.vote === "upvote")
                        .length -
                        post.votes.items.filter((v) => v.vote === "downvote")
                          .length} */}
                        {upvotes - downvotes}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ color: "white" }}>
                        votes
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton
                    color="inherit"
                    style={{
                      color: existingVote === "downvote" ? "green" : "white",
                    }}
                    onClick={() => addVote("downvote")}
                  >
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
        </>
      </Paper>
    </>
  );
}
