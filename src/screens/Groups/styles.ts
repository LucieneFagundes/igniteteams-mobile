import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeType } from "styled-components";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.COLORS.GRAY_600};
  padding: 1.5rem;
`;
