import { createServer } from 'http'
import createError from 'http-errors'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

import User from './models/user.js'
import app from './app.js'

const httpServer = createServer(app.callback())
const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: true,
    allowedHeaders: ['Authorization'],
  },
})

io.use(async (socket, next) => {
  if (!socket.handshake.headers?.authorization?.startsWith('Bearer ')) {
    return next(createError(401, "authorization header is absent or it's not Bearer"))
  }

  const token = socket.handshake.headers.authorization.split(' ')[1]

  try {
    const tokenDecoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, token) => {
        if (err) {
          reject(err)
        }

        resolve(token)
      })
    })

    /*
      find user in the db and check whether it has a teamId.
      If not - refuse the connection, else - attach the team id to socket.data.
    */

    const user = await User.findById(tokenDecoded.id)

    if (!user) {
      return next(createError(500, "token is valid but user doesn't exist in the database"))
    }

    if (!user.teamId) {
      return next(createError(403, "user doesn't belong to a team"))
    }

    socket.data.userId = user._id.toString()
    socket.data.teamId = user.teamId.toString()

    next()
  } catch (e) {
    if (e.status) {
      return next(e)
    }

    next(createError(401, 'invalid token'))
  }
})

io.on('connection', socket => {
  socket.join(socket.data.teamId)
})

export { httpServer, io }
