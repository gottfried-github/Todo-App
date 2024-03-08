import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

import { getUsers as actionGetUsers } from '../../store/actions/team'
import sliceTeam from '../../store/store/slice-team'

export default function AddUsers({ isModalOpen, modalCloseCb }) {
  const dispatch = useDispatch()

  const users = useSelector(state => sliceTeam.selectors.selectUsers(state))

  useEffect(() => {
    dispatch(actionGetUsers())
  }, [dispatch])

  return (
    <ModalStyled open={isModalOpen} onClose={modalCloseCb}>
      <PaperStyled elevation={8}>
        <List>
          {users.map(user => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': user.id }}
                  />
                </ListItemIcon>
                <ListItemText id={user.id} primary={user.userName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </PaperStyled>
    </ModalStyled>
  )
}

const ModalStyled = styled(Modal)`
  display: flex;
  margin: 15px;
`

const PaperStyled = styled(Paper)`
  width: 600px;
  height: max-content;
  padding: 15px;
  margin: auto;
`
