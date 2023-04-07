import { useState } from 'react'
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Container from '@mui/material/Container';

import { getInitialTheme } from './utils/theme';

import { Dashboard, Header, LoginButton, MatchList } from './components';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Leaderboard } from './components/pages/Leaderboard';
import { GroupList } from './components/groups/GroupList';

function App() {
  const INITIAL_THEME = getInitialTheme();

  const [theme, setTheme] = useState(INITIAL_THEME);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='sm' disableGutters>
      
        <BrowserRouter>
          <Header theme={theme} setTheme={setTheme} />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Routes>
              <Route path='/' element={<LoginButton />}/>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/predictions' element={<MatchList />} />
              <Route path='/leaderboard' element={<Leaderboard />} />
              <Route path='/groups' element={<GroupList />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App
