import { consola } from 'consola'
import express from 'express'
import wisp from 'wisp-server-node'
import http from 'node:http'
import path from 'node:path'
// code totaly not yoinked from mochaproxy
const httpServer = http.createServer()

const app = express()
const port = process.env.PORT || 8080

app.use(express.static('dist'))

app.get('/', (_req, res) => { // todo - route page based on the current route
  res.sendFile(path.resolve('dist', 'index.html'))
})
httpServer.on('request', (req, res) => {
  app(req, res)
})
httpServer.on('upgrade', (req, socket, head) => {
  if (req.url?.startsWith('/wisp/')) {
    wisp.routeRequest(req, socket, head)
  } else {
    socket.end()
  }
})

httpServer.on('listening', () => {
  consola.info(`Listening on http://localhost:${port}`)
})

httpServer.listen({
  port
})