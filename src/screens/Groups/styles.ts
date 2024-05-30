import { ThemeType } from "styled-components";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.COLORS.GRAY_600};
  padding: 1.5rem;
`;
