import React, { useState } from 'react'
import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  handleEdit: () => void
  handleDelete: () => void
  own: boolean | null
}

export default function RowMenu({ handleEdit, handleDelete, own }: Props) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <ButtonBase
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </ButtonBase>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleEdit()
            handleClose()
          }}
        >
          <EditIcon />
          <MenuItemText>Edit</MenuItemText>
        </MenuItem>
        <MenuItem
          disabled={!own}
          onClick={() => {
            handleDelete()
            handleClose()
          }}
        >
          <DeleteIcon /> <MenuItemText>Delete</MenuItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

const MenuItemText = styled.span`
  margin-left: 6px;
`
