import React from "react";
import { Link } from "react-router-dom";

import { styled } from "./Styletron";
import { Container } from "./Container";
import { Button } from "./Button";
import { useAuth } from "./Auth";
import { path as newPostPagePath } from "../pages/NewPostPage";
import { useProfile } from "./Profile";
import { Avatar } from "./Avatar";
import { Menu, MenuItem, MenuDivider } from "./Menu";

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

const StyledBrand = styled("a", {
  fontSize: "24px",
  fontWeight: "900",
  color: "inherit",
  textDecoration: "none",
});

export const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const profile = useProfile();

  return (
    <StyledHeader>
      <Container>
        <StyledNav>
          <StyledBrand $as={Link} to="/">
            DEV
          </StyledBrand>
          <StyledNavItems>
            {isAuthenticated ? (
              <>
                <Button
                  $as={Link}
                  to={newPostPagePath}
                  $style={({ $theme }) => ({
                    marginRight: $theme.sizings.scale2,
                  })}
                >
                  New post
                </Button>
                <Menu element={<Avatar src={profile?.avatar} />}>
                  {({ close }) => (
                    <>
                      <div style={{ width: "150px" }}>
                        <div>{profile.fullName}</div>
                        <div style={{ color: "rgba(0,0,0,.5)" }}>
                          <small>@{profile.username}</small>
                        </div>
                      </div>
                      <MenuDivider />
                      <MenuItem
                        onClick={() => {
                          close();
                        }}
                      >
                        Settings
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          logout();
                          close();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </>
            ) : (
              <Button onClick={login}>Login</Button>
            )}
          </StyledNavItems>
        </StyledNav>
      </Container>
    </StyledHeader>
  );
};
