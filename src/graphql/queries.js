/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      contents
      image
      votes {
        items {
          id
          vote
          postID
          createdAt
          updatedAt
          createdBy
        }
        nextToken
      }
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          createdBy
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        contents
        image
        votes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
        id
        title
        contents
        image
        votes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      postID
      content
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post {
          id
          title
          contents
          image
          createdAt
          updatedAt
          owner
        }
        postID
        content
        createdAt
        updatedAt
        createdBy
      }
      nextToken
    }
  }
`;
export const getVote = /* GraphQL */ `
  query GetVote($id: ID!) {
    getVote(id: $id) {
      id
      vote
      post {
        id
        title
        contents
        image
        votes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      postID
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const listVotes = /* GraphQL */ `
  query ListVotes(
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        vote
        post {
          id
          title
          contents
          image
          createdAt
          updatedAt
          owner
        }
        postID
        createdAt
        updatedAt
        createdBy
      }
      nextToken
    }
  }
`;
