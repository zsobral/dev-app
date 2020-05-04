import { styled } from "./Styletron";

const StyledCard = styled("div", ({ $theme }) => ({
  backgroundColor: $theme.colors.cardBackground,
  boxShadow: $theme.shadows.card,
  borderRadius: $theme.radius.card,
  paddingLeft: $theme.sizings.scale2,
  paddingRight: $theme.sizings.scale2,
  paddingTop: $theme.sizings.scale2,
  paddingBottom: $theme.sizings.scale2,
}));

export { StyledCard as Card };
