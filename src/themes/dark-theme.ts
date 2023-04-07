import { createTheme } from "@mui/material";

const primary = {
    main: "#fff",
};
const secondary = {
    main: "#fff",
};

const status = {
    error: "#ff1744",
};

const background = {
    default: "#000",
};

export const darkTheme = createTheme({

    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
        },
        MuiIconButton: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    color: primary.main
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: background.default
                }
            }
        }
    },

    palette: {
        background: {
            default: background.default
        },
        error: { 
            main: status.error
        },
        mode: "dark",
        primary: {
            main: primary.main
        },
        secondary: {
            main: secondary.main
        },
    },
    
});
