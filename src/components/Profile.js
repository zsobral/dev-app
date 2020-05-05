import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { useAuth } from "./Auth";
import { path as createProfilePage } from "../pages/CreateProfilePage";
import { Card } from "./Card";
import { Avatar } from "./Avatar";

const ProfileContext = createContext();

export const GET_PROFILE = gql`
  query {
    me {
      id
      username
      fullName
      avatar
    }
  }
`;

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data, loading, error } = useQuery(GET_PROFILE, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    const hasProfile = data?.me !== null;
    if (!hasProfile) {
      navigate(createProfilePage);
    }
  }, [loading, data, navigate]);

  if (error) {
    return "error";
  }

  return (
    <ProfileContext.Provider value={data?.me}>
      {children}
    </ProfileContext.Provider>
  );
};

export const ProfileCard = () => {
  const profile = useProfile();

  if (!profile) {
    return null;
  }

  return (
    <Card $style={({ $theme }) => ({ marginBottom: $theme.sizings.scale2 })}>
      <div style={{ display: "flex" }}>
        <Avatar
          src={profile.avatar}
          $style={({ $theme }) => ({
            width: "120px",
            height: "120px",
            marginRight: $theme.sizings.scale2,
          })}
        />
        <div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 600,
              marginTop: "0px",
              marginBottom: "0px",
            }}
          >
            {profile.fullName}
          </h1>
          <h2
            style={{
              marginTop: "0px",
              fontSize: "1rem",
              color: "rgba(0,0,0,.6)",
              fontWeight: 600,
            }}
          >
            @{profile.username}
          </h2>
        </div>
      </div>
    </Card>
  );
};
