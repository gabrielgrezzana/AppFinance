import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../theme.global";

export const useAppTheme = () => {
    const colorScheme = useColorScheme();
    return colorScheme === 'dark' ? darkTheme : lightTheme;
}