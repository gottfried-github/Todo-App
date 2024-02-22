import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { format } from 'date-fns'

import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'

import { ITEM_STATUS } from '../constants'
import { updateStatus, updateName, deleteOne } from '../store/actions'
import slice from '../store/slice'

export default function Items() {
  const dispatch = useDispatch()
  const gridApiRef = useGridApiRef()

  const [editingId, setEditingId] = useState(null)

  const filter = useSelector(state => slice.selectors.selectFilter({ [slice.reducerPath]: state }))
  const counters = useSelector(state =>
    slice.selectors.selectCounters({ [slice.reducerPath]: state })
  )

  const [paginationModel, setPaginationModel] = useState(filter.pagination)

  useEffect(() => {
    dispatch(slice.actions.setFilter({ pagination: paginationModel }))
  }, [dispatch, paginationModel])

  const items = useSelector(state => slice.selectors.selectItems({ [slice.reducerPath]: state }))
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
              variant="filled"
              fullWidth
              defaultValue={params.value}
              onKeyUp={ev => {
                handleNameChange(ev, params.row.id)
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
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: params => {
        return (
          <EditIcon
            onClick={() => {
              handleEdit(params.row.id)
            }}
          />
        )
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      renderCell: params => {
        return (
          <DeleteIcon
            onClick={() => {
              handleDelete(params.row.id)
            }}
          />
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
  & .MuiFilledInput-root .MuiFilledInput-input {
    padding: 0;
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
