import { Box, CircularProgress } from "@mui/material"

export const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    > 
        <CircularProgress /> 
    </Box>
  )
}
