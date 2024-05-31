const fs = require('fs');

let inputArr = []
let times = []
let distances = []
const initialValue = 1

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

let winsSums = []
readFileAsync("Day6").then(function (data) {
    inputArr = data.split("\r\n")
    times = inputArr[0].match(/\d+/g).map((el) => parseInt(el))
    distances = inputArr[1].match(/\d+/g).map((el) => parseInt(el))
    for (let i = 0; i < times.length; i++) {
        let winsSum = 0
        let time = times[i]
        let record = distances[i]
        let speed = 0
        for (let j = 1; j < times[i]; j++) {
            speed += 1
            time -= 1
            if (speed * time > record) {
                winsSum += 1
            }
        }
        winsSums.push(winsSum)
    }
    console.log(Object.values(winsSums).reduce(
        (accumulator, currentValue) => accumulator * currentValue,
        initialValue,
    ))
})