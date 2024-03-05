import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { format } from 'date-fns'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'

import { ITEM_STATUS } from '../../constants'
import { updateStatus, updateName, deleteOne } from '../../store/actions/todo'
import slice from '../../store/store/slice-todo'
import RowMenu from './RowMenu'

export default function Items() {
  const dispatch = useDispatch()
  const gridApiRef = useGridApiRef()

  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')

  const filter = useSelector(state => slice.selectors.selectFilter(state))
  const counters = useSelector(state => slice.selectors.selectCounters(state))

  const [paginationModel, setPaginationModel] = useState(filter.pagination)

  useEffect(() => {
    dispatch(slice.actions.setFilter({ pagination: paginationModel }))
  }, [dispatch, paginationModel])

  const items = useSelector(state => slice.selectors.selectItems(state))
  const rowCount = useMemo(() => {
    if (filter.status === null) {
      return counters.all
    }

    return filter.status === ITEM_STATUS.DONE ? counters.done : counters.notDone
  }, [filter, counters])

  const handlePaginationModelChange = paginationModel => {
    setPaginationModel(modelPrev => {
      if (paginationModel.pageSize !== modelPrev.pageSize) {
        return { ...paginationModel, page: 0 }
      }

      return paginationModel
    })
  }

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

  const handleNameChange = name => {
    setName(name)
  }

  const handleNameSubmit = () => {
    dispatch(
      updateName({
        id: editingId,
        name,
      })
    )
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

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      type: 'number',
      width: 80,
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
      width: 120,
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
              variant="outlined"
              fullWidth
              defaultValue={name}
              onChange={ev => {
                handleNameChange(ev.target.value)
              }}
              onKeyUp={ev => {
                // for .isComposing see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
                if (ev.isComposing || ev.code !== 'Enter') return

                handleNameSubmit()
                handleEdit(params.row.id)
              }}
              onKeyDown={ev => {
                ev.stopPropagation()
              }}
            />
          )
        }

        return (
          <Label checked={params.row.status === ITEM_STATUS.DONE} htmlFor={params.row.id}>
            {params.value}
          </Label>
        )
      },
    },
    {
      field: 'options',
      headerName: 'Options',
      sortable: false,
      width: 150,
      renderCell: params => {
        if (params.row.id !== editingId) {
          return (
            <RowMenu
              handleEdit={() => {
                handleNameChange(params.row.name)
                handleEdit(params.row.id)
              }}
              handleDelete={() => {
                handleDelete(params.row.id)
              }}
            />
          )
        }

        return (
          <>
            <Button
              variant="filled"
              onClick={() => {
                handleNameSubmit()
                handleEdit(params.row.id)
              }}
            >
              Submit
            </Button>
            <Button
              variant="filled"
              onClick={() => {
                handleNameChange(params.row.name)
                handleEdit(params.row.id)
              }}
            >
              Cancel
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <DataGridStyled
      apiRef={gridApiRef}
      sortingMode="server"
      onSortModelChange={handleSortModelChange}
      sortingOrder={['desc', 'asc']}
      pageSizeOptions={[5, 10]}
      rowCount={rowCount}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={handlePaginationModelChange}
      disableRowSelectionOnClick
      disableColumnMenu
      slots={{
        noRowsOverlay: ItemsPlaceholder,
      }}
      columns={columns}
      rows={items}
    />
  )
}

const TextFieldStyled = styled(TextField)`
  & .MuiOutlinedInput-input {
    padding: 0 4px;
  }
`

const DataGridStyled = styled(DataGrid)`
  grid-row: 4;
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
      // color: props.theme.palette.util.dark,
      textDecoration: 'line-through',
    }
  }

  return styles
})

function ItemsPlaceholder() {
  return <ItemsPlaceholderDiv>No data</ItemsPlaceholderDiv>
}

const ItemsPlaceholderDiv = styled.div`
  height: 100%;

  text-align: center;
  line-height: 40px;
`
