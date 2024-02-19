import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import TextField from './lib/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { updateStatus, updateName, deleteOne } from '../store/actions'

import { ITEM_STATUS } from '../constants'

import classes from './Item.module.css'

export default function Item({ item, isEditing, handleEdit }) {
  const dispatch = useDispatch()

  const handleNameChange = ev => {
    // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
    if (ev.isComposing || ev.code !== 'Enter') return

    dispatch(
      updateName({
        id: item.id,
        name: ev.target.value,
      })
    )

    handleEdit(item.id)
  }

  const handleStatusChange = () => {
    const status = item.status === ITEM_STATUS.DONE ? ITEM_STATUS.NOT_DONE : ITEM_STATUS.DONE

    dispatch(
      updateStatus({
        id: item.id,
        status,
      })
    )
  }

  const handleDelete = () => {
    dispatch(deleteOne(item.id))
  }

  const handleEditListener = () => {
    handleEdit(item.id)
  }

  return (
    <li className={classes.root}>
      <div className={classes.inputContainer}>
        {isEditing ? (
          <>
            <FormControlLabelStyled
              control={<Checkbox />}
              checked={item.status === ITEM_STATUS.DONE}
              onChange={handleStatusChange}
            />
            <TextFieldStyled
              type="text"
              variant="filled"
              fullWidth
              defaultValue={item.name}
              onKeyUp={handleNameChange}
            />
          </>
        ) : (
          <FormControlLabelStyled
            control={<Checkbox />}
            checked={item.status === ITEM_STATUS.DONE}
            label={item.name}
            onChange={handleStatusChange}
          />
        )}
      </div>
      <Button variant="base" onClick={handleEditListener}>
        edit
      </Button>
      <Button variant="base" onClick={handleDelete}>
        delete
      </Button>
    </li>
  )
}

const TextFieldStyled = styled(TextField)`
  & .MuiFilledInput-root .MuiFilledInput-input {
    padding: 0;
  }
`

const FormControlLabelStyled = styled(FormControlLabel)(props => {
  const styles = {
    flexGrow: 2,
    '& .MuiFormControlLabel-label': {
      flexGrow: 2,
    },
  }

  if (props.checked) {
    return {
      ...styles,
      '& .MuiFormControlLabel-label': {
        color: 'rgba(0, 0, 0, 0.5)',
        textDecoration: 'line-through',
      },
    }
  }

  return styles
})
