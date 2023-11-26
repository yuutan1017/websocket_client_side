
/// WebSocket Test Client
//

let socket

const send = document.getElementById("submit")
const disconnect = document.getElementById("disconnect")

const client_result = document.getElementById("client")
const server_result = document.getElementById("server")

const clear = document.getElementById("clear")

// connection flag
let connect_flag = false


// サーバー側と通信する関数
const connect = async() =>{

  socket = new WebSocket("ws://127.0.0.1:8888")

  socket.onopen = () => {
    client_result.value += "Client :=> Successfully server connect ... OK\n"

    socket.send("connect")
  }

  socket.onclose = () => {
    client_result.value += "Client :=> server disconnect ... OK\n"
    client_result.value += "Client :=> Close ... OK\n"

    socket.send("disconnect")
  }

  socket.onerror = () => {
    client_result.value += "ERROR...\n"
  }

  // サーバー側から進捗があった場合に更新される
  socket.onmessage = (message) =>{
    console.log(message)
    
    server_result.value += `Server :=> ${message.data}\n`
    client_result.value += `Client :=> ${message.data}\n`

    if(message.data === "complete"){
      socket.close()
      connect_flag = false
    }
  }
}

// Send Request Event
send.addEventListener('click', () => {
  if(!connect_flag){
    connect()
    connect_flag = true
  }
})

// Disconnect Event
disconnect.addEventListener('click', () => {
  if(connect_flag){    
    socket.close()
    connect_flag = false
  }
})


clear.addEventListener('click', () => {
  client_result.value = ""
  server_result.value = ""
})