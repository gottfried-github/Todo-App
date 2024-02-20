import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'

import { ITEM_STATUS } from '../constants'
import { updateStatus, updateName, deleteOne } from '../store/actions'
import slice from '../store/slice'

export default function Items() {
  const dispatch = useDispatch()
  const gridApiRef = useGridApiRef()

  const [editingId, setEditingId] = useState(null)

  const items = useSelector(state => slice.selectors.selectItems({ [slice.reducerPath]: state }))

  const handleEdit = itemId => {
    const _editingId = !editingId || editingId !== itemId ? itemId : null

    if (!editingId) {
      gridApiRef.current.updateRows([
        {
          id: itemId,
          name: {
            ...gridApiRef.current.getCellValue(itemId, 'name'),
            isEditing: true,
          },
        },
      ])

      setEditingId(_editingId)

      return
    }

    if (!_editingId) {
      gridApiRef.current.updateRows([
        {
          id: itemId,
          name: {
            ...gridApiRef.current.getCellValue(itemId, 'name'),
            isEditing: false,
          },
        },
      ])

      setEditingId(_editingId)

      return
    }

    gridApiRef.current.updateRows([
      {
        id: editingId,
        name: {
          ...gridApiRef.current.getCellValue(editingId, 'name'),
          isEditing: false,
        },
      },
    ])

    gridApiRef.current.updateRows([
      {
        id: _editingId,
        name: {
          ...gridApiRef.current.getCellValue(itemId, 'name'),
          isEditing: true,
        },
      },
    ])

    setEditingId(_editingId)
  }

  const handleStatusChange = (ev, data) => {
    const status = data.status === ITEM_STATUS.DONE ? ITEM_STATUS.NOT_DONE : ITEM_STATUS.DONE

    dispatch(
      updateStatus({
        id: data.id,
        status,
      })
    )
  }

  const handleNameChange = (ev, itemId) => {
    // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
    if (ev.isComposing || ev.code !== 'Enter') return
    dispatch(
      updateName({
        id: itemId,
        name: ev.target.value,
      })
    )

    handleEdit(itemId)
  }

  const handleDelete = itemId => {
    dispatch(deleteOne(itemId))
  }

  return (
    <DataGridStyled
      apiRef={gridApiRef}
      disableRowSelectionOnClick
      columns={[
        {
          field: 'status',
          type: 'number',
          renderCell: params => {
            return (
              <Checkbox
                id={params.row.id}
                checked={params.value === ITEM_STATUS.DONE}
                onClick={ev => {
                  handleStatusChange(ev, {
                    id: params.row.id,
                    status: params.value,
                  })
                }}
              />
            )
          },
        },
        {
          field: 'name',
          flex: 1,
          renderCell: params => {
            if (params.value.isEditing) {
              return (
                <TextFieldStyled
                  type="text"
                  variant="filled"
                  fullWidth
                  defaultValue={params.value.name}
                  onKeyUp={ev => {
                    handleNameChange(ev, params.row.id)
                  }}
                />
              )
            }

            return (
              <Label checked={params.row.status === ITEM_STATUS.DONE} htmlFor={params.row.id}>
                {params.value.name}
              </Label>
            )
          },
        },
        {
          field: 'edit',
          renderCell: params => {
            return (
              <Button
                variant="base"
                onClick={() => {
                  handleEdit(params.row.id)
                }}
              >
                edit
              </Button>
            )
          },
        },
        {
          field: 'delete',
          renderCell: params => {
            return (
              <Button
                variant="base"
                onClick={() => {
                  handleDelete(params.row.id)
                }}
              >
                delete
              </Button>
            )
          },
        },
      ]}
      rows={items.map(item => ({
        id: item.id,
        status: item.status,
        name: {
          isEditing: item.id === editingId,
          name: item.name,
        },
      }))}
    />
  )
}

const Container = styled.ul`
  height: 100%;
  overflow-y: auto;

  margin: 0;
  padding: 0;

  list-style-type: none;
`

const TextFieldStyled = styled(TextField)`
  & .MuiFilledInput-root .MuiFilledInput-input {
    padding: 0;
  }
`

const DataGridStyled = styled(DataGrid)`
  border: none;

  & .MuiDataGrid-withBorderColor {
    border-color: transparent;
  }
`

const Label = styled.label(props => {
  const styles = {
    flexGrow: 1,
  }

  if (props.checked) {
    return {
      ...styles,
      color: props.theme.palette.util.dark,
      textDecoration: 'line-through',
    }
  }

  return styles
})
