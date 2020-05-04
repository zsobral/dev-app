import React from "react";
import { Layout } from "../components/Layout";
import { Posts } from "../components/Posts";

export const path = "/";

export const HomePage = () => {
  return (
    <Layout>
      <Posts />
    </Layout>
  );
};
