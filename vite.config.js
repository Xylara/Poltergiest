import { execSync } from 'node:child_process'
import { defineConfig, normalizePath } from 'vite'
import solid from 'vite-plugin-solid'
import wisp from 'wisp-server-node'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import { uvPath } from '@titaniumnetwork-dev/ultraviolet'
import { baremuxPath } from '@mercuryworkshop/bare-mux/node'
import { epoxyPath } from '@mercuryworkshop/epoxy-transport'
import { libcurlPath } from '@mercuryworkshop/libcurl-transport'
import path from 'node:path'

export default defineConfig({
  plugins: [
    solid(),
    {
      name: 'Wisp Server',
      configureServer(server) {
        server.httpServer?.on('upgrade', (req, socket, head) => {
          if (req.url?.startsWith('/wisp/')) {
            wisp.routeRequest(req, socket, head)
          }
        })
      }
    },
    viteStaticCopy({
      targets: [
        {
          src: [normalizePath(path.resolve(uvPath, 'uv.bundle.js')), normalizePath(path.resolve(uvPath, 'uv.handler.js')), normalizePath(path.resolve(uvPath, 'uv.client.js')), normalizePath(path.resolve(uvPath, 'uv.sw.js')), normalizePath(path.resolve(uvPath, 'sw.js'))],
          dest: 'u3'
        },
        {
          src: [normalizePath(path.resolve(baremuxPath, 'worker.js')), normalizePath(path.resolve(baremuxPath, 'index.js'))],
          dest: 'baremux'
        },
        {
          src: [normalizePath(path.resolve(epoxyPath, 'index.mjs')), normalizePath(path.resolve(epoxyPath, 'index.js'))],
          dest: 'epoxy'
        },
        {
          src: normalizePath(path.resolve(libcurlPath, 'index.mjs')),
          dest: 'libcurl'
        }
      ]
    })
  ],
  server: {
      port: 3000,
    }
})