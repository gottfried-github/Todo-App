import BoxLayout from '../BoxLayout'
import Paper from '../AuthPaper'
import SigninForm from './SigninForm'

export default function Signin() {
  return (
    <BoxLayout>
      <Paper elevation={8}>
        <SigninForm />
      </Paper>
    </BoxLayout>
  )
}
