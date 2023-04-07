import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, auth } from '../../service/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from 'react';
import { Loading } from '../ui/Loading';
export const LoginButton = () => {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
    {loading ? <Loading /> : 
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Button variant='contained' onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </Box>
  }
  </>
  )
}
