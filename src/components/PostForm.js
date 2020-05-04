import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { GET_POSTS } from "./Posts";
import { useProfile } from "./Profile";
import { Button } from "./Button";
import { styled } from "./Styletron";
import { Markdown } from "./Markdown";

const CREATE_POST = gql`
  mutation($text: String!, $profileId: ID!) {
    post: createPost(text: $text, profileId: $profileId) {
      id
      text
    }
  }
`;

const initialValues = { text: "" };

const StyledTextArea = styled("textarea", ({ $theme }) => ({
  border: "none",
  width: "100%",
  fontFamily: "monospace",
  fontSize: "1.2rem",
  minHeight: "200px",
  height: "auto",
  resize: "none",
  overflowY: "hidden",
  marginBottom: $theme.sizings.scale2,
  ":focus": {
    outline: "none",
  },
}));

const StyledFormFooter = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
});

export const PostForm = () => {
  const profile = useProfile();
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createPost] = useMutation(CREATE_POST, {
    update: (cache, { data }) => {
      const { posts } = cache.readQuery({ query: GET_POSTS });
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: [...posts, data.post] },
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await createPost({
      variables: { text: values.text, profileId: profile.id },
    });
    setValues(initialValues);
    setIsSubmitting(false);
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isPreview ? (
        <div style={{ minHeight: "200px" }}>
          <Markdown source={values.text} />
        </div>
      ) : (
        <StyledTextArea
          name="text"
          placeholder="body"
          value={values.text}
          onChange={handleChange}
          onInput={(event) => {
            event.target.style.height = `auto`;
            event.target.style.height = `${event.target.scrollHeight}px`;
          }}
        />
      )}

      <StyledFormFooter>
        <Button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          style={{ marginRight: "8px" }}
        >
          Preview
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Publish
        </Button>
      </StyledFormFooter>
    </form>
  );
};
