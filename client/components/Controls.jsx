import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getItems, deleteDone } from '../actions'
import slice from '../store/slice'

import { ITEM_STATUS } from '../constants'

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

  const filterActiveClass = 'active'

  const handleDeleteDone = () => {
    dispatch(deleteDone())
  }

  const handleSetFilter = (ev, filter) => {
    if (ev.target.classList.contains(filterActiveClass)) return

    dispatch(getItems({ status: filter }))
  }

  console.log('Controls, countAll:', countAll)

  useEffect(() => {
    dispatch(getItems())
    dispatch(getItems({ status: filter }))
  }, [dispatch, filter])

  if (!countAll) return null

  return (
    <div className="controls">
      <div>
        <span className="counter">{`${countDone} completed`}</span>
        {', '}
        <span className="counter">{`${countNotDone} left`}</span>
      </div>
      <div className="filters">
        <button
          className={`filter${filter === null ? ` ${filterActiveClass}` : ''}`}
          onClick={ev => {
            handleSetFilter(ev, null)
          }}
        >
          all
        </button>
        <button
          className={`filter${filter === ITEM_STATUS.DONE ? ` ${filterActiveClass}` : ''}`}
          onClick={ev => {
            handleSetFilter(ev, ITEM_STATUS.DONE)
          }}
        >
          completed
        </button>
        <button
          className={`filter${filter === ITEM_STATUS.NOT_DONE ? ` ${filterActiveClass}` : ''}`}
          onClick={ev => {
            handleSetFilter(ev, ITEM_STATUS.NOT_DONE)
          }}
        >
          active
        </button>
      </div>
      <button className="delete-done" onClick={handleDeleteDone}>
        clear completed
      </button>
    </div>
  )
}
