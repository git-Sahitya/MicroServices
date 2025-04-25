const http = require('http')
const app = require('./app')

const server = http.createServer(app)

server.listen(3002 , ()=>{
    console.log('Captain server is running on port no. 3002');
    
})