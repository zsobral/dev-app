import React from "react";
import { styled } from "./Styletron";

const StyledContainer = styled("div", () => ({
  width: "40px",
  height: "40px",
  borderRadius: "9999px",
  overflow: "hidden",
}));

const StyledImg = styled("img", () => ({
  maxWidth: "100%",
  height: "auto",
}));

export const Avatar = ({ name, src, ...props }) => (
  <StyledContainer {...props}>
    <StyledImg src={src} />
  </StyledContainer>
);
