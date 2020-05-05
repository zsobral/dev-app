import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "../components/Layout";
import { ProfileForm } from "../components/ProfileForm";
import { Card } from "../components/Card";
import { useProfile } from "../components/Profile";
import { path as homePagePath } from "../pages/HomePage";

export const path = "/complete-profile";

export const CreateProfilePage = () => {
  const navigate = useNavigate();
  const profile = useProfile();

  useEffect(() => {
    if (profile) {
      navigate(homePagePath);
    }
  }, [profile, navigate]);

  return (
    <Layout>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Card>
          <h1 style={{ marginTop: "0px" }}>
            Complete your profile to continue
          </h1>
          <ProfileForm onSuccess={() => navigate(homePagePath)} />
        </Card>
      </div>
    </Layout>
  );
};
