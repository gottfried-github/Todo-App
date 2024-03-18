import mongoose from 'mongoose'
import { httpServer } from './socket.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  httpServer.listen(process.env.HTTP_PORT, () => {
    console.log(`server is running at port ${process.env.HTTP_PORT}`)
  })
}

main()
