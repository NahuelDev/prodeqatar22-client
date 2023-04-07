import { Theme } from "@mui/material";
import { darkTheme, lightTheme } from "../themes";

export const isLightTheme = (theme: Theme): boolean => {
    return (theme === lightTheme);
};

export const getInitialTheme = () : Theme => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") return darkTheme;
    else if (theme === "light") return lightTheme;
    return window.matchMedia("(prefers-color-scheme:dark)").matches
        ? darkTheme
        : lightTheme;
};

export const saveThemeOnLocalStorage = (theme: Theme) => {
    const value = isLightTheme(theme) ? "light" : "dark";
    localStorage.setItem("theme", value);
};