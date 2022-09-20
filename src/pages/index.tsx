import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { useUser } from "../context/AuthContext";
import { listPosts } from "../graphql/queries";
import { API } from "aws-amplify";
import { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";

export default function Index() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({
        query: listPosts,
      })) as {
        data: ListPostsQuery;
        errors: any[];
      };
      if (allPosts.data) {
        setPosts(allPosts.data.listPosts.items as Post[]);
        return allPosts.data.listPosts.items as Post[];
      } else {
        throw new Error("Could not read posts");
      }
    };

    fetchPostsFromApi();
  }, []);

  console.log("User", user);
  console.log("Posts", posts);

  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </Container>
  );
}

// Get all posts on the server-side
// since all userc can read posts
// we use API key auhtorisation method
