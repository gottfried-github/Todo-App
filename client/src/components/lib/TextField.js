import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'

export default styled(TextField)`
  & .MuiFilledInput-root {
    background-color: ${props => props.theme.palette.util.main};
  }

  & .MuiFilledInput-root.Mui-focused {
    background-color: rgba(0, 0, 0, 0.06);
  }
`
