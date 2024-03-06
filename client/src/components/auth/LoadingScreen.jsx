import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoadingScreen() {
  return (
    <Container>
      <CircularProgress />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`
