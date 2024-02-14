import { useState } from 'react'
import { useSelector } from 'react-redux'

import slice from '../store/slice'

import Item from './Item'

export default function Items() {
  const [editingId, setEditingId] = useState(null)

  const items = useSelector(state => slice.selectors.selectItems({ [slice.reducerPath]: state }))

  const handleEdit = itemId => {
    if (!editingId || editingId !== itemId) {
      setEditingId(itemId)
    } else {
      setEditingId(null)
    }
  }

  return (
    <ul className="items">
      {items.map(item => (
        <Item key={item.id} item={item} isEditing={editingId === item.id} handleEdit={handleEdit} />
      ))}
    </ul>
  )
}
