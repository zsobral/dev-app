import React from "react";

import { Layout } from "../components/Layout";
import { PostForm } from "../components/PostForm";
import { Card } from "../components/Card";

export const path = "/new";

export const NewPostPage = () => (
  <Layout>
    <Card>
      <PostForm />
    </Card>
  </Layout>
);
