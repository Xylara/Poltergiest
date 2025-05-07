import { consola } from 'consola'
import express from 'express'
import wisp from 'wisp-server-node'
import http from 'node:http'
const httpServer = http.createServer()

const app = express()
const port = process.env.PORT || 3000

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
  consola.info(`Wisp on http://localhost:${port}`)
})

httpServer.listen({
  port
})