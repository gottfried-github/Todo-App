import { useState, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { format } from 'date-fns'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { GridValueFormatterParams, GridRenderCellParams, GridColDef } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'

import { ITEM_STATUS } from '../../constants'
import { creators as actionCreators } from '../../store/actions/todo'
import selectorsTodo from '../../store/selectors/todo'
import selectorsAuth from '../../store/selectors/auth'
import RowMenu from './RowMenu'

type PaginationModel = {
  page: number
  pageSize: number
}

export default function Items() {
  const dispatch = useAppDispatch()
  const gridApiRef = useGridApiRef()

  const [editingId, setEditingId] = useState<null | string>(null)
  const [name, setName] = useState('')

  const filter = useAppSelector(state => selectorsTodo.selectFilter(state))
  const counters = useAppSelector(state => selectorsTodo.selectCounters(state))
  const userData = useAppSelector(state => selectorsAuth.selectUserData(state))

  const [paginationModel, setPaginationModel] = useState(filter.pagination)

  useEffect(() => {
    dispatch(actionCreators.storeSetFilter({ pagination: paginationModel }))
  }, [dispatch, paginationModel])

  const items = useAppSelector(state => selectorsTodo.selectItems(state))
  const rowCount = useMemo(() => {
    if (filter.status === null) {
      return counters.all
    }

    return filter.status === ITEM_STATUS.DONE ? counters.done : counters.notDone
  }, [filter, counters])

  const handlePaginationModelChange = (paginationModel: PaginationModel) => {
    setPaginationModel(modelPrev => {
      if (paginationModel.pageSize !== modelPrev.pageSize) {
        return { ...paginationModel, page: 0 }
      }

      return paginationModel
    })
  }

  const handleEdit = (itemId: string) => {
    setEditingId(!editingId || editingId !== itemId ? itemId : null)
  }

  const handleStatusChange = (
    ev: React.MouseEvent,
    data: { id: string; userId: string; status: number }
  ) => {
    const status = data.status === ITEM_STATUS.DONE ? ITEM_STATUS.NOT_DONE : ITEM_STATUS.DONE

    dispatch(
      actionCreators.sagaUpdateStatus({
        id: data.id,
        userId: data.userId,
        status,
      })
    )
  }

  const handleNameChange = (name: string) => {
    setName(name)
  }

  const handleNameSubmit = (userId: string) => {
    dispatch(
      actionCreators.sagaUpdateName({
        id: editingId,
        userId,
        name,
      })
    )
  }

  const handleDelete = (itemId: string) => {
    dispatch(actionCreators.sagaDeleteOne(itemId))
  }

  const handleSortModelChange = (
    sortModel: { field: string; sort: string | null | undefined }[]
  ) => {
    const sort = {
      field: sortModel[0].field,
      order: sortModel[0].sort === 'desc' ? -1 : 1,
    }

    dispatch(actionCreators.storeSetFilter({ sort }))
  }

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      type: 'number',
      width: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Checkbox
            id={params.row.id}
            checked={params.value === ITEM_STATUS.DONE}
            onClick={ev => {
              handleStatusChange(ev, {
                id: params.row.id,
                userId: params.row.user.id,
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
      valueFormatter: (params: GridValueFormatterParams) => {
        return format(params.value, 'MMM d, y')
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
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
                if ((ev as unknown as KeyboardEvent).isComposing || ev.code !== 'Enter') return

                handleNameSubmit(params.row.user.id)
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
      field: 'createdBy',
      headerName: 'Created By',
      sortable: false,
      valueGetter: (params: GridRenderCellParams) => {
        return params.row.user.userName
      },
    },
    {
      field: 'options',
      headerName: 'Options',
      sortable: false,
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.id !== editingId) {
          return (
            <RowMenu
              own={params.row.user.id === userData?.id || null}
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
          <ItemMenuButtonsContainer>
            <Button
              variant="ordinary"
              onClick={() => {
                handleNameSubmit(params.row.user.id)
                handleEdit(params.row.id)
              }}
            >
              Submit
            </Button>
            <Button
              variant="ordinary"
              onClick={() => {
                handleNameChange(params.row.name)
                handleEdit(params.row.id)
              }}
            >
              Cancel
            </Button>
          </ItemMenuButtonsContainer>
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
        loadingOverlay: LoadingPlaceholder,
        noResultsOverlay: LoadingPlaceholder,
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
  box-shadow: ${props => props.theme.shadows['8']};

  & .MuiDataGrid-withBorderColor {
    border-color: transparent;
  }

  & .MuiDataGrid-columnHeaders,
  & .MuiDataGrid-footerContainer {
    background-color: ${props => props.theme.palette.util.lightDark};
  }
`

const Label = styled.label((props: { checked: boolean }) => {
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

function LoadingPlaceholder() {
  return (
    <LoadingPlaceholderDiv>
      <CircularProgress />
    </LoadingPlaceholderDiv>
  )
}

const LoadingPlaceholderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const ItemMenuButtonsContainer = styled.div`
  display: flex;
  column-gap: 6px;
`
