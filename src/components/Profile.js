import React, { createContext, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import { useAuth } from "./Auth";
import { ProfileForm } from "./ProfileForm";

const ProfileContext = createContext();

const GET_PROFILE = gql`
  query {
    myProfile {
      id
      username
      fullName
    }
  }
`;

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { data, loading, error } = useQuery(GET_PROFILE, {
    skip: !isAuthenticated,
  });

  if (error) {
    return "error";
  }

  if (!loading && data?.myProfile === null) {
    return <ProfileForm />;
  }

  return (
    <ProfileContext.Provider value={data?.myProfile}>
      {children}
    </ProfileContext.Provider>
  );
};
