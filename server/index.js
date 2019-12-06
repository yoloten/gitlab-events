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

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.post('/', function (req, res){
   res.status(200).json({success: true})
   io.emit("result", req.body)
})

io.on('connection', function (socket) {
    socket.emit("data", { data: "welcome" })
  
    socket.on('test', function (data) {
      socket.emit("data", { hello: "one" })
      console.log(data);
    });
  })
  
  