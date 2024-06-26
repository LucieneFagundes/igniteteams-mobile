import { ThemeType } from "styled-components";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.COLORS.GRAY_600};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(
  ({ theme }: { theme: ThemeType }) => ({
    color: theme.COLORS.GREEN_700,
  })
)``;
