import { styled } from "./Styletron";

const StyledButton = styled("button", ({ $theme }) => ({
  color: $theme.colors.buttonText,
  backgroundColor: $theme.colors.primary,
  borderRadius: $theme.radius.button,
  paddingTop: $theme.sizings.scale1,
  paddingBottom: $theme.sizings.scale1,
  paddingLeft: $theme.sizings.scale2,
  paddingRight: $theme.sizings.scale2,
  border: "none",
  fontWeight: "600",
  textTransform: "uppercase",
  fontSize: "1rem",
  cursor: "pointer",
  textDecoration: "none",
  fontFamily: "inherit",
}));

export { StyledButton as Button };
