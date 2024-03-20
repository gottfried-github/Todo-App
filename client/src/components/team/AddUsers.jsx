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

import { addUser as actionAddUser } from '../../store/actions/sagas/team'
import { deleteUser as actionDeleteUser } from '../../store/actions/sagas/team'
import sliceTeam from '../../store/store/slice-team'

export default function AddUsers({ users, isModalOpen, modalCloseCb }) {
  const dispatch = useDispatch()

  const members = useSelector(state => sliceTeam.selectors.selectMembers(state))

  const handleToggleUser = (user, checked) => {
    if (!checked) {
      return dispatch(actionDeleteUser(user))
    }

    dispatch(actionAddUser(user))
  }

  return (
    <ModalStyled open={isModalOpen} onClose={modalCloseCb}>
      <PaperStyled elevation={8}>
        <List>
          {users.map(user => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton
                role={undefined}
                dense
                onClick={() => {
                  handleToggleUser(user, !members.map(member => member.id).includes(user.id))
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={members.map(member => member.id).includes(user.id)}
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
