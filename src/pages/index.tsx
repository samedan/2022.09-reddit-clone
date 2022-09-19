import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUser } from "../context/AuthContext";
import { listPosts } from "../graphql/queries";
import { API } from "aws-amplify";
import { Post } from "../API";

export default function Index() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({
        query: listPosts,
      })) as { data: Post[]; errors: any[] };
      if (allPosts.data) {
        setPosts(allPosts.data);
        return allPosts.data;
      } else {
        throw new Error("Could not read posts");
      }
    };

    fetchPostsFromApi();
  }, []);

  console.log("User", user);
  console.log("Posts", posts);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
      </Box>
    </Container>
  );
}

// Get all posts on the server-side
// since all userc can read posts
// we use API key auhtorisation method
