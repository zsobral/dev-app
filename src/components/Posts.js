import React from "react";
import { gql, useQuery } from "@apollo/client";

import { Card } from "./Card";
import { Markdown } from "./Markdown";
import { Avatar } from "./Avatar";

export const GET_POSTS = gql`
  query {
    posts {
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
                </small>
              </div>
              <Markdown source={post.text} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
