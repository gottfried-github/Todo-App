import { type Socket } from 'socket.io-client'

import { type Item } from './actions/store/todo'
import { ITEM_CREATE, ITEM_UPDATE, ITEM_DELETE } from './events/index'
import { store } from './store/store'
import { creators as actionCreatorsStoreAuth } from './actions/store/auth'
import { creators as actionCreatorsSagaTodo } from './actions/sagas/todo'
import { creators as actionCreatorsStoreTodo } from './actions/store/todo'

const actions: { [actionName: string]: (data: Item) => void } = {
  [ITEM_CREATE]: (data: Item) => {
    store.dispatch(actionCreatorsStoreTodo.append(data))
  },
  [ITEM_UPDATE]: (data: Item) => {
    store.dispatch(
      actionCreatorsStoreTodo.updateItem({
        id: data.id,
        fields: data,
      })
    )
  },
  [ITEM_DELETE]: (data: Item) => {
    store.dispatch(actionCreatorsStoreTodo.deleteItem(data))
  },
}

export default function subscribe(socket: Socket) {
  socket.on('connect_error', e => {
    console.log('socket, connect_error, e:', e)
    store.dispatch(
      actionCreatorsStoreAuth.setErrorSocket(
        e.message || 'something went wrong while connecting to the socket server'
      )
    )
  })

  socket.on('connect', () => {
    console.log('socket, connect')
  })

  socket.on('disconnect', () => {
    console.log('socket, disconnect')
    const state = store.getState()

    if (!state.auth.token) return

    store.dispatch(actionCreatorsSagaTodo.getItems())
  })

  socket.on('event', ev => {
    console.log("socket, 'event' fired, ev:", ev)
    actions[ev.type](ev.metadata)
  })
}
