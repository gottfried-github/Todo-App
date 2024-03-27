import React, { useState } from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import { TextField } from '../todo/Form'

import { useAppDispatch } from '../../hooks/react-redux'
import { creators as actionCreators } from '../../store/actions/team'

export default function CreateTeam() {
  const dispatch = useAppDispatch()
  const [teamName, setTeamName] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const handleTeamNameChange = (ev: React.ChangeEvent) => {
    setTeamName((ev.target as HTMLInputElement).value)
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    console.log('handleSubmit, teamName:', teamName)

    dispatch(
      actionCreators.sagaCreate({
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
