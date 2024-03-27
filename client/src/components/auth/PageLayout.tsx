import styled from '@emotion/styled'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`
