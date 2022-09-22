import React from "react";
import { Comment } from "../API";
import { ReactElement } from "react";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import formatDatePosted from "../lib/formatDatePosted";

interface Props {
  comment: Comment;
}

export default function PostComment({ comment }: Props): ReactElement {
  console.log("comment", comment);
  return (
    <Paper
      style={{
        width: "100%",
        minHeight: 128,
        padding: 8,
        paddingLeft: 18,
        marginTop: 16,
      }}
      elevation={1}
    >
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Typography variant="body1">
            <b>{comment.createdBy}</b> - {formatDatePosted(comment.createdAt)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{comment.content}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
