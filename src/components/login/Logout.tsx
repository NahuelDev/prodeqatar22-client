import { Button } from '@mui/material'
import { logout } from '../../service/firebase'

export const LogoutButton = () => {
  return (
    <Button variant='contained' onClick={logout}>
          Log out
    </Button>
  )
}
