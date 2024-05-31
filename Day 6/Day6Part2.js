const fs = require('fs');

let inputArr = []
let duration = 0
let record = 0

const readFileAsync = async function (file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, "utf8", function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

readFileAsync("Day6").then(function (data) {
    inputArr = data.split("\r\n")
    duration = parseInt(inputArr[0].match(/\d/g).join(""))
    record = parseInt(inputArr[1].match(/\d/g).join(""))
    let winsSum = 0
    let speed = 0
    let time = duration
    for (let j = 1; j < duration; j++) {
        speed += 1
        time -= 1
        if (speed * time > record) {
            winsSum += 1
        }
    }
    console.log(winsSum)
})