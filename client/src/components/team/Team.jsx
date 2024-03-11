import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import IconDelete from '@mui/icons-material/Delete'
import AddUsers from './AddUsers'

import { get as actionGet } from '../../store/actions/team'
import { deleteUser as actionDeleteUser } from '../../store/actions/team'
import { getUsers as actionGetUsers } from '../../store/actions/team'
import { deleteTeam as actionDeleteTeam } from '../../store/actions/team'

import sliceTeam from '../../store/store/slice-team'

export default function Team() {
  const dispatch = useDispatch()

  const [isAddUsersOpen, setIsAddUsersOpen] = useState(false)

  const data = useSelector(state => sliceTeam.selectors.selectData(state))
  const members = useSelector(state => sliceTeam.selectors.selectMembers(state))
  const users = useSelector(state => sliceTeam.selectors.selectUsers(state))

  useEffect(() => {
    dispatch(actionGet())
  }, [dispatch])

  const handleAddUsersOpen = () => {
    dispatch(actionGetUsers())
    setIsAddUsersOpen(true)
  }

  const handleAddUsersClose = () => {
    setIsAddUsersOpen(false)
  }

  const handleDeleteUser = user => {
    dispatch(actionDeleteUser(user))
  }

  const handleDeleteTeam = () => {
    dispatch(actionDeleteTeam())
  }

  return (
    <div>
      {data ? <Typography variant="h1">{data.name}</Typography> : null}
      {members.length ? (
        <List>
          {members.map(member => (
            <ListItem
              key={member.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <IconDelete
                    onClick={() => {
                      handleDeleteUser(member)
                    }}
                  />
                </IconButton>
              }
            >
              {member.userName}
            </ListItem>
          ))}
        </List>
      ) : null}
      <Button variant="ordinary" onClick={handleAddUsersOpen}>
        Add users
      </Button>
      <Button variant="ordinary" onClick={handleDeleteTeam}>
        Delete team
      </Button>
      <AddUsers users={users} isModalOpen={isAddUsersOpen} modalCloseCb={handleAddUsersClose} />
    </div>
  )
}
