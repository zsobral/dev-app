import React, { useState, useEffect } from "react";

import { styled } from "./Styletron";

const StyledButtonDropdown = styled("button", () => ({
  background: "none",
  border: "none",
  padding: "0px",
  margin: "0px",
  borderRadius: "9999px",
}));

const StyledMenuContainer = styled("div", ({ $theme }) => ({
  position: "relative",
}));

const StyledMenuItems = styled("div", ({ $theme }) => ({
  position: "absolute",
  left: "0px",
  top: "calc(100% + 8px)",
  backgroundColor: "#ffffff",
  padding: $theme.sizings.scale1,
  boxShadow: $theme.shadows.menu,
  borderRadius: $theme.radius.menu,
  display: "flex",
  flexDirection: "column",
}));

const StyledMenuItem = styled("button", ({ $theme }) => ({
  borderRadius: $theme.radius.menuItem,
  padding: $theme.sizings.scale1,
  background: "none",
  border: "none",
  width: "100%",
  fontSize: "1rem",
  textAlign: "left",
  ":hover": {
    backgroundColor: "rgba(0,0,0,.06)",
  },
}));

const StyledDivider = styled("div", ({ $theme }) => ({
  height: "1px",
  backgroundColor: "rgba(0,0,0,.1)",
  marginLeft: "-8px",
  marginRight: "-8px",
  marginTop: $theme.sizings.scale1,
  marginBottom: $theme.sizings.scale1,
}));

export { StyledMenuItem as MenuItem, StyledDivider as MenuDivider };

export const Menu = ({ element, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    window.addEventListener("click", close);

    return () => {
      window.removeEventListener("click", close);
    };
  });

  return (
    <StyledMenuContainer onClick={(event) => event.stopPropagation()}>
      <StyledButtonDropdown onClick={() => setIsOpen(!isOpen)}>
        {element}
      </StyledButtonDropdown>
      {isOpen && <StyledMenuItems>{children({ close })}</StyledMenuItems>}
    </StyledMenuContainer>
  );
};
