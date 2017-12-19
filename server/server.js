const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use([
  bodyParser.urlencoded({ extended: true }),
  cors()
])

app.post('/savefile.php', (req, res) => {
  const { stamp, message } = req.body
  const outputDir = path.resolve('./output')
  const timestamp = (new Date()).getTime()
  const logFileName = `${outputDir}/${stamp}_${timestamp}.txt`

  fs.writeFileSync(logFileName, message)

  res.send('Done!')
})

app.use((err, req, res, next) => {
  console.error('ERROR!', err)
  res.status(500).send('Error!')
})

app.listen(process.env.PORT || 8000)
