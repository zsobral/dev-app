import React from "react";
import { Layout } from "../components/Layout";
import { Posts } from "../components/Posts";
import { ProfileCard } from "../components/Profile";

export const path = "/";

export const HomePage = () => {
  return (
    <Layout>
      <ProfileCard />
      <Posts />
    </Layout>
  );
};
