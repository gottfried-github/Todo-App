import Typography from '@mui/material/Typography'
import BoxLayout from '../BoxLayout'
import Paper from '../AuthPaper'
import { Link } from '../Signup/Signup'
import SigninForm from './SigninForm'

export default function Signin() {
  return (
    <BoxLayout>
      <Paper elevation={8}>
        <SigninForm />
        <Typography variant="body1" align="center">
          Don't have an account? <Link to="/auth/signup">Sign up</Link>
        </Typography>
      </Paper>
    </BoxLayout>
  )
}
