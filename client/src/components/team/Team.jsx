import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { get as actionGet } from '../../store/actions/team'
import sliceTeam from '../../store/store/slice-team'

export default function Team() {
  const dispatch = useDispatch()

  const data = useSelector(state => sliceTeam.selectors.selectData(state))

  useEffect(() => {
    dispatch(actionGet())
  }, [dispatch])

  return data ? <div>{data.name}</div> : null
}
