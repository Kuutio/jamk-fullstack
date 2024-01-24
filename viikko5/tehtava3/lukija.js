const fs = require("fs")

fs.readFile('luvut.txt', (error, data) => {
    if (error) console.error(error)
    else console.log(toArray(data))
 })

 const toArray = (data) => {
    let numberstr = data.toString()
    numbers = 0
    const array1337 = numberstr.split(",");
    let total = 0
    for (element in array1337){
        total = total + parseInt(array1337[element]) 

    }
    return `Sum is ${total}`

 }
