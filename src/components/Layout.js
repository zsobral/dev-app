import React from "react";

import { styled } from "./Styletron";
import { Header } from "./Header";
import { Container } from "./Container";

const StyledWrapper = styled("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.body,
  width: "100%",
  height: "100vh",
  overflowX: "hidden",
  overflowY: "auto",
}));

const StyledMain = styled("main", ({ $theme }) => ({
  marginTop: $theme.sizings.scale2,
}));

export const Layout = ({ children }) => {
  return (
    <StyledWrapper>
      <Header />
      <StyledMain>
        <Container>{children}</Container>
      </StyledMain>
    </StyledWrapper>
  );
};
