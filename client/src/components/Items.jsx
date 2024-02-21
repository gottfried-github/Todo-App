import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { format } from 'date-fns'

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
    setEditingId(!editingId || editingId !== itemId ? itemId : null)
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

  const handleSortModelChange = sortModel => {
    const sort = {
      field: sortModel[0].field,
      order: sortModel[0].sort === 'desc' ? -1 : 1,
    }

    dispatch(slice.actions.setFilter({ sort }))
  }

  return (
    <DataGridStyled
      apiRef={gridApiRef}
      disableRowSelectionOnClick
      sortingMode="server"
      onSortModelChange={handleSortModelChange}
      sortingOrder={['desc', 'asc']}
      columns={[
        {
          field: 'status',
          headerName: 'Status',
          type: 'number',
          width: 30,
          sortable: false,
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
          field: 'createdAt',
          headerName: 'Created At',
          width: 110,
          valueFormatter: params => {
            return format(params.value, 'MMM d, y')
          },
        },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          renderCell: params => {
            if (params.row.id === editingId) {
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
          headerName: 'Edit',
          sortable: false,
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
          headerName: 'Delete',
          sortable: false,
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
          name: item.name,
        },
        createdAt: item.createdAt,
      }))}
    />
  )
}

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
