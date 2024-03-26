import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import IconDelete from '@mui/icons-material/Delete'
import AddUsers from './AddUsers'

import type { UserData } from '../../store/actions/types'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'
import { creators as actionCreatorsSaga } from '../../store/actions/sagas/team'
import selectors from '../../store/store/selectors-team'

export default function Team() {
  const dispatch = useAppDispatch()

  const [isAddUsersOpen, setIsAddUsersOpen] = useState(false)

  const data = useAppSelector(state => selectors.selectData(state))
  const members = useAppSelector(state => selectors.selectMembers(state))
  const users = useAppSelector(state => selectors.selectFreeUsers(state))

  useEffect(() => {
    dispatch(actionCreatorsSaga.getTeam())
  }, [dispatch])

  const handleAddUsersOpen = () => {
    dispatch(actionCreatorsSaga.getFreeUsers())
    setIsAddUsersOpen(true)
  }

  const handleAddUsersClose = () => {
    setIsAddUsersOpen(false)
  }

  const handleDeleteUser = (user: UserData) => {
    dispatch(actionCreatorsSaga.deleteUser(user))
  }

  const handleDeleteTeam = () => {
    dispatch(actionCreatorsSaga.deleteTeam())
  }

  return (
    <Root>
      {data ? <Typography variant="title1">{data.name}</Typography> : null}
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
      <Buttons>
        <Button variant="ordinary" onClick={handleAddUsersOpen}>
          Add users
        </Button>
        <Button variant="danger" onClick={handleDeleteTeam}>
          Delete team
        </Button>
      </Buttons>
      <AddUsers users={users} isModalOpen={isAddUsersOpen} modalCloseCb={handleAddUsersClose} />
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;

  width: 100%;
  padding: 0 45px;
  padding-bottom: 16px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  grid-row: 3;

  column-gap: 4px;
`
