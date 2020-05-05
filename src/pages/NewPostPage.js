import React from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "../components/Layout";
import { PostForm } from "../components/PostForm";
import { Card } from "../components/Card";
import { path as homePagePath } from "./HomePage";

export const path = "/new";

export const NewPostPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Card>
        <PostForm onSuccess={() => navigate(homePagePath)} />
      </Card>
    </Layout>
  );
};
