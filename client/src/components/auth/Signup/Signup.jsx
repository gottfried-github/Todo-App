import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import BoxLayout from '../BoxLayout'
import Paper from '../AuthPaper'
import SignupForm from './SignupForm'

export default function Signup() {
  return (
    <BoxLayout>
      <Paper elevation={8}>
        <SignupForm />
        <Typography variant="body1" align="center">
          Already have an account? <LinkStyled to="/auth/signin">Sign in</LinkStyled>
        </Typography>
      </Paper>
    </BoxLayout>
  )
}

const LinkStyled = styled(Link)`
  font-weight: ${props => props.theme.typography.fontWeightBold};
  color: ${props => props.theme.palette.primary.main};

  text-decoration: none;
`

export { LinkStyled as Link }
