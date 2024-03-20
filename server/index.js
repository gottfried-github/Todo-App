import mongoose from 'mongoose'
import env from './config.js'
import { httpServer } from './socket.js'

async function main() {
  await mongoose.connect(env.DB_CONNECTION)

  httpServer.listen(env.HTTP_PORT, () => {
    console.log(`server is running at port ${env.HTTP_PORT}`)
  })
}

main()
