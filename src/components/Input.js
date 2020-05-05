import React from "react";

import { styled } from "./Styletron";

const StyledInputControl = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: $theme.sizings.scale2,
}));

const StyledLabel = styled("label", ({ $theme }) => ({
  marginBottom: $theme.sizings.scale1,
  fontWeight: "600",
}));

const StyledInput = styled("input", ({ $theme }) => ({
  padding: $theme.sizings.scale1,
  borderRadius: $theme.radius.input,
  border: `1px solid ${$theme.colors.primary}`,
  fontFamily: "inherit",
  fontSize: "inherit",
}));

export const Input = ({ label, id, ...props }) => {
  return (
    <StyledInputControl>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput id={id} {...props} />
    </StyledInputControl>
  );
};
