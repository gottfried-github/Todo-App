import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Button from '@mui/material/Button'

import { getItems, deleteDone } from '../actions'
import slice from '../store/slice'

import { ITEM_STATUS } from '../constants'

import classes from './Controls.module.css'

export default function Controls() {
  const dispatch = useDispatch()

  const countAll = useSelector(state =>
    slice.selectors.selectCount({ [slice.reducerPath]: state }, null)
  )

  const countDone = useSelector(state =>
    slice.selectors.selectCount({ [slice.reducerPath]: state }, ITEM_STATUS.DONE)
  )

  const countNotDone = useSelector(state =>
    slice.selectors.selectCount({ [slice.reducerPath]: state }, ITEM_STATUS.NOT_DONE)
  )

  const filter = useSelector(state => slice.selectors.selectFilter({ [slice.reducerPath]: state }))

  const handleDeleteDone = () => {
    dispatch(deleteDone())
  }

  const handleSetFilter = (ev, filter) => {
    if (filter === null) return

    dispatch(getItems({ status: filter === false ? null : filter }))
  }

  useEffect(() => {
    dispatch(getItems())
    dispatch(getItems({ status: filter }))
  }, [dispatch, filter])

  if (!countAll) return null

  return (
    <div className={classes.root}>
      <Counters variant="body2">
        <span>{`${countDone} completed`}</span>
        {', '}
        <span>{`${countNotDone} left`}</span>
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
    </div>
  )
}

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
  column-gap: 2px;
`

const ClearAllButton = styled(Button)`
  font-weight: 800;
  color: ${props => props.theme.palette.danger.main} !important;
`

const Counters = styled(Typography)`
  color: #589054;
`
