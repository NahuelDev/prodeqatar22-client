import { AppBar, Box, Button, Toolbar, Theme, IconButton } from "@mui/material"
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Dispatch, SetStateAction, useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { darkTheme, lightTheme } from "../../themes";
import { isLightTheme, saveThemeOnLocalStorage } from "../../utils/theme";
import { useNavigate } from "react-router-dom";
interface Props {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const Header = ({theme, setTheme}: Props) => {

    const navigate = useNavigate();

  useEffect(() => {
      saveThemeOnLocalStorage(theme);
  }, [theme]);

  const handleChangeTheme = () => {
      setTheme((prevTheme) =>
          isLightTheme(prevTheme) ? darkTheme : lightTheme
      );
  };


  return (
    <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            <Button
                variant="text"
                color="secondary"
                startIcon={<SportsSoccerIcon />}
                onClick={() => navigate('/')}
            >
                PRODEGIOS
            </Button>

              <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                  <IconButton
                        onClick={handleChangeTheme}
                        sx={{
                            color: isLightTheme(theme)
                                ? lightTheme.palette.secondary.main
                                : darkTheme.palette.primary.main
                        }}
                    >
                        {isLightTheme(theme) ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )}
                  </IconButton>
                </Box>
        </Toolbar>
    </AppBar>
  )
}
