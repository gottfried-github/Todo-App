import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Button from '@mui/material/Button'

import { getItems, deleteDone } from '../store/actions'
import slice from '../store/slice'

import { ITEM_STATUS } from '../constants'

export default function Controls() {
  const dispatch = useDispatch()

  const counters = useSelector(state =>
    slice.selectors.selectCounters({ [slice.reducerPath]: state })
  )

  const filter = useSelector(state => slice.selectors.selectFilter({ [slice.reducerPath]: state }))

  const handleDeleteDone = () => {
    dispatch(deleteDone())
  }

  const handleSetFilter = (ev, filter) => {
    if (filter === null) return

    dispatch(slice.actions.setFilter(filter === false ? null : filter))
  }

  useEffect(() => {
    dispatch(getItems({ status: filter }))
  }, [dispatch, filter])

  if (!counters.all) return null

  return (
    <Container>
      <Counters variant="body2">
        <span>{`${counters.done} completed`}</span>
        {', '}
        <span>{`${counters.notDone} left`}</span>
        {', '}
        <span>{`${counters.all} total`}</span>
      </Counters>
      <ToggleButtonGroupStyled
        exclusive
        value={filter === null ? false : filter}
        onChange={handleSetFilter}
      >
        <ToggleButton value={false}>all</ToggleButton>
        <ToggleButton value={ITEM_STATUS.DONE}>completed</ToggleButton>
        <ToggleButton value={ITEM_STATUS.NOT_DONE}>active</ToggleButton>
      </ToggleButtonGroupStyled>
      <ClearAllButton variant="base" onClick={handleDeleteDone}>
        clear completed
      </ClearAllButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 8px;

  color: ${props => props.theme.palette.util.dark};
`

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  column-gap: 2px;
`

const ClearAllButton = styled(Button)`
  font-weight: 800;
  color: ${props => props.theme.palette.danger.main} !important;
`

const Counters = styled(Typography)`
  color: ${props => props.theme.palette.util.green};
`
