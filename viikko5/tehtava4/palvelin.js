const fs = require('fs')
const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const path = './counterfile.txt'

const server = http.createServer((req, res) => {
    fs.readFile(path, (error, data) => {
        if (error) {
            res.statusCode = 500
            res.end
        }
        else {
            let count = Number(data.toString()) + 1

            fs.writeFile(path,count.toString(), (error) => {
                if (error){
                    console.log(error)
                }else{
                    console.log("File written successfully\n"); 
                }
            })

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            res.write(`Request counter value is ${count.toString()}`)
            res.end()
    
        }
    })

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})