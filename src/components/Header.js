import React from "react";
import { Link } from "react-router-dom";

import { styled } from "./Styletron";
import { Container } from "./Container";
import { Button } from "./Button";
import { useAuth } from "./Auth";
import { Github } from "./Icon";
import { path as newPostPagePath } from "../pages/NewPostPage";

const StyledHeader = styled("header", ({ $theme }) => ({
  backgroundColor: $theme.colors.headerBackground,
  boxShadow: $theme.shadows.header,
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
}));

const StyledNav = styled("nav", ({ $theme }) => ({
  backgroundColor: $theme.colors.navBackgroundColor,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledNavItems = styled("div", {
  display: "flex",
  alignItems: "center",
});

const StyledBrand = styled("div", {
  fontSize: "24px",
  fontWeight: "900",
});

export const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <StyledBrand>DEV</StyledBrand>
          <StyledNavItems>
            <Github style={{ marginRight: '8px' }} />
            {isAuthenticated && (
              <Button $as={Link} to={newPostPagePath} $style={{ marginRight: '8px' }}>
                New post
              </Button>
            )}
            {isAuthenticated ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button onClick={login}>Login</Button>
            )}
          </StyledNavItems>
        </StyledNav>
      </Container>
    </StyledHeader>
  );
};
