import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import { TextField } from '../todo/Form'

import { create as actionCreate } from '../../store/actions/team'

export default function CreateTeam() {
  const dispatch = useDispatch()
  const [teamName, setTeamName] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const handleTeamNameChange = ev => {
    setTeamName(ev.target.value)
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    console.log('handleSubmit, teamName:', teamName)

    dispatch(
      actionCreate({
        name: teamName,
      })
    )
  }

  const handleOpen = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <ButtonStyled variant="main" onClick={handleOpen}>
        create a team
      </ButtonStyled>
      <ModalStyled open={modalOpen} onClose={handleClose}>
        <PaperStyled elevation={8}>
          <Form onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              placeholder="Team name"
              value={teamName}
              onChange={handleTeamNameChange}
            />
            <Button type="submit" variant="main">
              Create Team
            </Button>
          </Form>
        </PaperStyled>
      </ModalStyled>
    </>
  )
}

const ButtonStyled = styled(Button)`
  margin: auto;
`

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 16px;
`
