/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
      id
      title
      contents
      image
      votes {
        items {
          vote
          postID
          id
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
      id
      title
      contents
      image
      votes {
        items {
          vote
          postID
          id
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
      id
      title
      contents
      image
      votes {
        items {
          vote
          postID
          id
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($createdBy: String) {
    onCreateComment(createdBy: $createdBy) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($createdBy: String) {
    onUpdateComment(createdBy: $createdBy) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($createdBy: String) {
    onDeleteComment(createdBy: $createdBy) {
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
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote($createdBy: String) {
    onCreateVote(createdBy: $createdBy) {
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
      id
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote($createdBy: String) {
    onUpdateVote(createdBy: $createdBy) {
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
      id
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote($createdBy: String) {
    onDeleteVote(createdBy: $createdBy) {
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
      id
      createdAt
      updatedAt
      createdBy
    }
  }
`;
