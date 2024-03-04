import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

import { signout as actionSignout } from '../store/actions/auth'

import Todos from '../components/todo/Todos'

export default function Cabinet() {
  const dispatch = useDispatch()

  return (
    <>
      <AppBarStyled>
        <ToolBarStyled>
          <Button
            variant="filled"
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
`

const ToolBarStyled = styled(ToolBar)`
  width: max-content;
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
`
