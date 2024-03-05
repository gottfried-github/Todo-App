import { useState } from 'react'
import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export default function RowMenu({ handleEdit, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = event => {
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
