import React from "react";
import { gql, useQuery } from "@apollo/client";

import { Card } from "./Card";
import { Markdown } from "./Markdown";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

export const GET_POSTS = gql`
  query GET_POSTS($cursor: String) {
    posts(first: 15, after: $cursor, orderBy: CREATED_AT_DESC) {
      edges {
        node {
          id
          text
          createdAt
          profile {
            id
            username
            fullName
            avatar
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const Posts = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS);

  const handleLoadMoreClick = () => {
    fetchMore({
      variables: { cursor: data?.posts?.pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { edges: newEdges, pageInfo } = fetchMoreResult.posts;

        return newEdges.length
          ? {
              posts: {
                __typename: previousResult.posts.__typename,
                edges: [...previousResult.posts.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  };

  if (error) {
    return "error";
  }

  if (loading) {
    return "loading";
  }

  return (
    <div>
      {data.posts.edges.map(({ node: post }) => (
        <Card
          $style={({ $theme }) => ({ marginBottom: $theme.sizings.scale2 })}
          key={post.id}
        >
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "16px" }}>
              <Avatar src={post.profile.avatar} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ fontWeight: 600 }}>{post.profile.fullName} </div>
                <small style={{ color: "rgba(0,0,0,.6)", marginLeft: "8px" }}>
                  @{post.profile.username}
                  {" - "}
                  {new Date(post.createdAt).toLocaleDateString()}
                  {" - "}
                  {new Date(post.createdAt).toLocaleTimeString()}
                </small>
              </div>
              <Markdown source={post.text} />
            </div>
          </div>
        </Card>
      ))}
      {data?.posts?.pageInfo?.hasNextPage && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleLoadMoreClick}>load more</Button>
        </div>
      )}
    </div>
  );
};
