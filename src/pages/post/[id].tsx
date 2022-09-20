import React, { ReactElement } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { API, withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import { GetPostQuery, ListPostsQuery, Post } from "../../API";

interface Props {
  post: Post;
}

export default function IndividualPost({ post }: Props): ReactElement {
  console.log("Post: ", post);

  return <div>IndividaulPost</div>;
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
