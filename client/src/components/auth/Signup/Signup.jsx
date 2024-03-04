import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import SignupForm from './SignupForm'

export default function Signup() {
  return (
    <BoxLayout>
      <Paper variant="auth">
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

const BoxLayout = styled.div`
  margin: auto;
`

export { LinkStyled as Link, BoxLayout }
