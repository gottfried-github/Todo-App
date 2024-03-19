import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import { signout as actionSignout } from '../store/actions/auth'
import sliceAuth from '../store/store/slice-auth'

export default function Header() {
  const dispatch = useDispatch()
  const userData = useSelector(state => sliceAuth.selectors.selectUserData(state))

  return (
    <AppBarStyled>
      <ToolBarStyled>
        <Nav>
          <LinkStyled to="/">Tasks</LinkStyled>
          <LinkStyled to="/teams">Team</LinkStyled>
        </Nav>
        <Chip label={userData.firstName} />
        <Button
          variant="app-bar"
          onClick={() => {
            dispatch(actionSignout({ server: true }))
          }}
        >
          sign out
        </Button>
      </ToolBarStyled>
    </AppBarStyled>
  )
}

const AppBarStyled = styled(AppBar)`
  align-items: flex-end;
  padding: 0 45px;
  background-color: ${props => props.theme.palette.custom.dark};
`

const ToolBarStyled = styled(ToolBar)`
  justify-content: flex-end;
  column-gap: 8px;
  width: 100%;
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
`

const Nav = styled.nav`
  display: flex;
  column-gap: 4px;

  position: absolute;
  left: 0;
`

const LinkStyled = styled(NavLink)`
  padding: 4px;
  font-size: ${props => props.theme.typography.body2.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightBold};

  background-color: 'transparent';
  color: ${props => props.theme.palette.custom.textDark};
  border: 'none';
  text-decoration: none;

  &:hover,
  &.active {
    background-color: ${props => props.theme.palette.custom.main};
    color: ${props => props.theme.palette.custom.textMain};
  }
`
