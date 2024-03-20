import bodyParser from 'koa-bodyparser'
import { io } from '../socket.js'

export const parseBody = bodyParser({
  enableTypes: 'json',
})

export const validateContentType = async (ctx, next) => {
  if (
    'content-length' in ctx.request.headers &&
    parseInt(ctx.request.headers['content-length']) > 0 &&
    (!('content-type' in ctx.request.headers) ||
      ctx.request.headers['content-type'] !== 'application/json')
  ) {
    ctx.status = 415

    ctx.body = {
      message: 'only application/json content-type is supported',
    }

    return
  }

  await next()
}

export const handleErrors = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (!e.expose) {
      ctx.status = e.status || 500
      ctx.body = { message: 'internal server error' }

      ctx.app.emit('error', e)

      return
    }

    ctx.status = e.status
    ctx.body = e
  }
}

export const utils = async (ctx, next) => {
  ctx.send = async (status, data, message) => {
    ctx.status = status || 200

    const body = data || (message && { message }) || {}
    if (message && !body.message) {
      body.message = message
    }

    ctx.body = body
  }

  ctx.socketSend = async (evType, data) => {
    const socketsAll = await io.fetchSockets()
    const socketUser = socketsAll.find(socket => socket.data.userId === ctx.state.user.id)

    if (!socketUser) return

    const socketsTeam = await io.in(socketUser.data.teamId).fetchSockets()

    socketsTeam
      .filter(socket => socket.data.userId !== socketUser.data.userId)
      .forEach(socket => {
        socket.emit('event', {
          type: evType,
          metadata: data,
        })
      })
  }

  ctx.socketDisconnect = async userIds => {
    const socketsAll = await io.fetchSockets()

    socketsAll.forEach(socket => {
      if (!userIds.includes(socket.data.userId)) return

      socket.disconnect(true)
    })
  }

  await next()
}
