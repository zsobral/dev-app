import { styled } from "./Styletron";

const StyledContainer = styled("div", ({ $theme }) => ({
  maxWidth: $theme.sizings.container,
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
}));

export { StyledContainer as Container };
