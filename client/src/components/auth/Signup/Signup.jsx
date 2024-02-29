import BoxLayout from '../BoxLayout'
import Paper from '../AuthPaper'
import SignupForm from './SignupForm'

export default function Signup() {
  return (
    <BoxLayout>
      <Paper elevation={8}>
        <SignupForm />
      </Paper>
    </BoxLayout>
  )
}
