import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

export default styled(Link)`
  font-weight: ${props => props.theme.typography.fontWeightBold};
  color: ${props => props.theme.palette.primary.main};

  text-decoration: none;
`
