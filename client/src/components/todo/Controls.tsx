import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'

import { creators as actionCreatorsStore } from '../../store/actions/store/todo'
import { creators as actionCreatorsSaga } from '../../store/actions/sagas/todo'
import selectors from '../../store/store/selectors-todo'

import { ITEM_STATUS } from '../../constants'

export default function Controls() {
  const dispatch = useAppDispatch()

  const filter = useAppSelector(state => selectors.selectFilter(state))
  const counters = useAppSelector(state => selectors.selectCounters(state))

  const handleDeleteDone = () => {
    dispatch(actionCreatorsSaga.deleteDone())
  }

  const handleSetFilter = (ev: React.MouseEvent, _filter: null | boolean | number) => {
    if (_filter === null) return

    dispatch(
      actionCreatorsStore.setFilter({
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
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  align-items: center;

  padding: 8px 8px;
  padding-top: 16px;
  padding-bottom: 20px;
`

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  justify-self: center;
  column-gap: 2px;
`

const ClearAllButton = styled(Button)`
  justify-self: flex-end;
  font-weight: 800;
`

const Counters = styled(Typography)``
