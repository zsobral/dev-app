import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Input } from "./Input";

const CREATE_PROFILE = gql`
  mutation($username: String!, $fullName: String, $accountId: ID!) {
    createProfile(
      username: $username
      fullName: $fullName
      accountId: $accountId
    ) {
      id
      avatar
      username
      fullName
    }
  }
`;

const initialValues = { username: "", fullName: "" };

export const ProfileForm = ({ accountId }) => {
  const [state, setState] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProfile] = useMutation(CREATE_PROFILE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await createProfile({
      variables: {
        username: state.username,
        fullName: state.fullName,
        accountId,
      },
    });
    setIsSubmitting(false);
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
        label="Nome completo"
        id="fullName"
        name="fullName"
        value={state.fullName}
        onChange={handleChange}
      />
      <button type="submit" disabled={isSubmitting}>
        ok
      </button>
    </form>
  );
};
