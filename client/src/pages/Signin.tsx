import Typography from '@mui/material/Typography'
import { BoxLayout } from './Signup'
import Paper from '@mui/material/Paper'
import { Link } from './Signup'
import SigninForm from '../components/auth/Signin/SigninForm'

export default function Signin() {
  return (
    <BoxLayout>
      <Paper variant="auth" elevation={8}>
        <SigninForm />
        <Typography variant="body1" align="center">
          Don't have an account? <Link to="/auth/signup">Sign up</Link>
        </Typography>
      </Paper>
    </BoxLayout>
  )
}
