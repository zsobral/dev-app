import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { GET_PROFILE } from "./Profile";
import { Input } from "./Input";
import { Button } from "./Button";

const CREATE_PROFILE = gql`
  mutation($username: String!, $fullName: String) {
    createProfile(username: $username, fullName: $fullName) {
      id
      avatar
      username
      fullName
    }
  }
`;

const initialValues = { username: "", fullName: "" };

export const ProfileForm = ({ onSuccess = () => {} }) => {
  const [state, setState] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProfile] = useMutation(CREATE_PROFILE, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: GET_PROFILE,
        data: { me: data.createProfile },
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await createProfile({
      variables: {
        username: state.username,
        fullName: state.fullName,
      },
    });
    onSuccess();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        id="username"
        name="username"
        value={state.username}
        onChange={handleChange}
      />
      <Input
        label="Full name"
        id="fullName"
        name="fullName"
        value={state.fullName}
        onChange={handleChange}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" disabled={isSubmitting}>
          Continue
        </Button>
      </div>
    </form>
  );
};
