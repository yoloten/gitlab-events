const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {origins: '*:*'})
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false} ))

server.listen(3000, () => {
    console.log(`Running server on port 3000`)
})

app.post('/', function (req, res){
   res.status(200).json({success: true})
   io.emit("result", req.body)
})


  
  