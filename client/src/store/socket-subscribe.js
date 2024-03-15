import { ITEM_CREATE, ITEM_UPDATE, ITEM_DELETE } from './events/index'
import { store } from './store/store'
import slice from './store/slice-todo'

const actions = {
  [ITEM_CREATE]: data => {
    store.dispatch(slice.actions.append(data))
  },
  [ITEM_UPDATE]: data => {
    store.dispatch(
      slice.actions.updateItem({
        id: data.id,
        fields: data,
      })
    )
  },
  [ITEM_DELETE]: data => {
    store.dispatch(slice.actions.deleteItem(data))
  },
}

export default function subscribe(socket) {
  socket.on('connect_error', e => {
    console.log('socket, connect_error, e:', e)
  })

  socket.on('connect', () => {
    console.log('socket, connect')
  })

  socket.on('disconnect', () => {
    console.log('socket, disconnect')
  })

  socket.on('event', ev => {
    console.log("socket, 'event' fired, ev:", ev)
    actions[ev.type](ev.metadata)
  })
}
