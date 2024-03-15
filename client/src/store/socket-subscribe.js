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

  socket.on('event', data => {
    console.log("socket, 'event' fired, data:", data)
  })
}
