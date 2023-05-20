/* eslint-disable prettier/prettier */
import 'dotenv'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt  from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify();
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(multipart)
app.register(cors, {
  origin: true, // todas as URLs de front end poderão acessar nosso back-end
})
app.register(jwt, {
  secret: 'spacetime', 
})
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
