import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'

import App from '../App'

export default function Cabinet() {
  return (
    <>
      <AppBarStyled>
        <ToolBarStyled>
          <Button variant="filled">sign out</Button>
        </ToolBarStyled>
      </AppBarStyled>
      <App />
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
