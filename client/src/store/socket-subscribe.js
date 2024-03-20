import { ITEM_CREATE, ITEM_UPDATE, ITEM_DELETE } from './events/index'
import { store } from './store/store'
import sliceAuth from './store/slice-auth'

import { creators as actionCreatorsSagaTodo } from './actions/sagas/todo'
import { creators as actionCreatorsStoreTodo } from './actions/store/todo'

const actions = {
  [ITEM_CREATE]: data => {
    store.dispatch(actionCreatorsStoreTodo.append(data))
  },
  [ITEM_UPDATE]: data => {
    store.dispatch(
      actionCreatorsStoreTodo.updateItem({
        id: data.id,
        fields: data,
      })
    )
  },
  [ITEM_DELETE]: data => {
    store.dispatch(actionCreatorsStoreTodo.deleteItem(data))
  },
}

export default function subscribe(socket) {
  socket.on('connect_error', e => {
    console.log('socket, connect_error, e:', e)
    store.dispatch(
      sliceAuth.actions.setErrorSocket(
        e.message || 'something went wrong while connecting to the socket server'
      )
    )
  })

  socket.on('connect', () => {
    console.log('socket, connect')
    store.dispatch(sliceAuth.actions.setHasSocketConnected())
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
