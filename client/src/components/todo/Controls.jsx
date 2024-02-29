import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Button from '@mui/material/Button'

import { deleteDone } from '../../store/actions/todo'
import slice from '../../store/store/slice-todo'

import { ITEM_STATUS } from '../../constants'

export default function Controls() {
  const dispatch = useDispatch()

  const filter = useSelector(state => slice.selectors.selectFilter(state))
  const counters = useSelector(state => slice.selectors.selectCounters(state))

  const handleDeleteDone = () => {
    dispatch(deleteDone())
  }

  const handleSetFilter = (ev, _filter) => {
    if (_filter === null) return

    dispatch(
      slice.actions.setFilter({
        status: _filter === false ? null : _filter,
        pagination: { ...filter.pagination, page: 0 },
      })
    )
  }

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
        value={filter.status === null ? false : filter.status}
        onChange={handleSetFilter}
      >
        <ToggleButton size="small" value={false}>
          all
        </ToggleButton>
        <ToggleButton size="small" value={ITEM_STATUS.DONE}>
          completed
        </ToggleButton>
        <ToggleButton size="small" value={ITEM_STATUS.NOT_DONE}>
          active
        </ToggleButton>
      </ToggleButtonGroupStyled>
      <ClearAllButton variant="danger" onClick={handleDeleteDone}>
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
  padding-top: 24px;
`

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  column-gap: 2px;
`

const ClearAllButton = styled(Button)`
  font-weight: 800;
`

const Counters = styled(Typography)``
