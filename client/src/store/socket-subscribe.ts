import { type Socket } from 'socket.io-client'

import { type StorePayloadItem } from './types/todo'
import { ITEM_CREATE, ITEM_UPDATE, ITEM_DELETE } from './events/index'
import { store } from './store'
import { creators as actionCreatorsAuth } from './actions/auth'
import { creators as actionCreatorsTodo } from './actions/todo'

const actions: { [actionName: string]: (data: StorePayloadItem) => void } = {
  [ITEM_CREATE]: (data: StorePayloadItem) => {
    store.dispatch(actionCreatorsTodo.storeAppend(data))
  },
  [ITEM_UPDATE]: (data: StorePayloadItem) => {
    store.dispatch(
      actionCreatorsTodo.storeUpdateItem({
        id: data.id,
        fields: data,
      })
    )
  },
  [ITEM_DELETE]: (data: StorePayloadItem) => {
    store.dispatch(actionCreatorsTodo.storeDeleteItem(data))
  },
}

export default function subscribe(socket: Socket) {
  socket.on('connect_error', e => {
    console.log('socket, connect_error, e:', e)
    store.dispatch(
      actionCreatorsAuth.storeSetErrorSocket(
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

    store.dispatch(actionCreatorsTodo.sagaGetItems())
  })

  socket.on('event', ev => {
    console.log("socket, 'event' fired, ev:", ev)
    actions[ev.type](ev.metadata)
  })
}
