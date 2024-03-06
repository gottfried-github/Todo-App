import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import { signout as actionSignout } from '../store/actions/auth'
import sliceAuth from '../store/store/slice-auth'

import Todos from '../components/todo/Todos'

export default function Cabinet() {
  const dispatch = useDispatch()
  const userData = useSelector(state => sliceAuth.selectors.selectUserData(state))

  console.log('Cabinet, userData:', userData)

  return (
    <>
      <AppBarStyled>
        <ToolBarStyled>
          <Chip label={userData.firstName} />
          <Button
            variant="app-bar"
            onClick={() => {
              dispatch(actionSignout())
            }}
          >
            sign out
          </Button>
        </ToolBarStyled>
      </AppBarStyled>
      <Todos />
    </>
  )
}

const AppBarStyled = styled(AppBar)`
  align-items: flex-end;
  padding: 0 45px;
  background-color: ${props => props.theme.palette.custom.dark};
`

const ToolBarStyled = styled(ToolBar)`
  column-gap: 8px;
  width: max-content;
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
`
