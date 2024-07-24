import path from 'path'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import db from './db.js'

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

app.get('/deformation', (req, res) => {
  res.json(db.deformation)
})
app.get('/termo', (req, res) => {
  res.json(db.termo)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
