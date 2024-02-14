import { useDispatch } from 'react-redux'
import { updateStatus, updateName, deleteOne } from '../actions'

import { ITEM_STATUS } from '../constants'

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

  const labelClassName = item.status === ITEM_STATUS.DONE ? 'checked' : ''

  return (
    <li className="item">
      <div className="input-container">
        <input
          id={item.id}
          className="input-checkbox"
          type="checkbox"
          checked={item.status === ITEM_STATUS.DONE}
          onChange={handleStatusChange}
        />
        {isEditing ? (
          <input
            className="input-edit"
            type="text"
            defaultValue={item.name}
            onKeyUp={handleNameChange}
          />
        ) : (
          <label className={labelClassName} htmlFor={item.id}>
            {item.name}
          </label>
        )}
      </div>
      <button className="edit" onClick={handleEditListener}>
        edit
      </button>
      <button className="delete" onClick={handleDelete}>
        delete
      </button>
    </li>
  )
}
