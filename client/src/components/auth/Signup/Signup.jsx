import Typography from '@mui/material/Typography'
import BoxLayout from '../BoxLayout'
import Paper from '../AuthPaper'
import Link from '../AuthLink'
import SignupForm from './SignupForm'

export default function Signup() {
  return (
    <BoxLayout>
      <Paper elevation={8}>
        <SignupForm />
        <Typography variant="body1" align="center">
          Already have an account? <Link to="/auth/signin">Sign in</Link>
        </Typography>
      </Paper>
    </BoxLayout>
  )
}
