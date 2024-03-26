import styled from '@emotion/styled'

export default function Layout({ children }) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`
