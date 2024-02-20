import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'

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
    <Container>
      <DataGrid
        apiRef={gridApiRef}
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

              return <label htmlFor={params.row.id}>{params.value.name}</label>
            },
          },
          {
            field: 'edit',
            renderCell: params => {
              return (
                <button
                  onClick={() => {
                    handleEdit(params.row.id)
                  }}
                >
                  edit
                </button>
              )
            },
          },
          {
            field: 'delete',
            renderCell: params => {
              return (
                <button
                  onClick={() => {
                    handleDelete(params.row.id)
                  }}
                >
                  delete
                </button>
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
      ></DataGrid>
    </Container>
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
