import React from "react";
import { gql, useQuery } from "@apollo/client";

import { Card } from "./Card";
import { Markdown } from "./Markdown";

export const GET_POSTS = gql`
  query {
    posts {
      id
      text
      profile {
        id
        username
      }
    }
  }
`;

export const Posts = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (error) {
    return "error";
  }

  if (loading) {
    return "loading";
  }

  return (
    <div>
      {data.posts.map((post) => (
        <Card
          $style={({ $theme }) => ({ marginBottom: $theme.sizings.scale2 })}
          key={post.id}
        >
          <Markdown source={post.text} />
        </Card>
      ))}
    </div>
  );
};
