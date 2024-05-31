const fs = require('fs');

let inputArr = []
let steps = 0
let network = {}
let currentNode = "AAA"

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

readFileAsync("Day8").then(function (data) {
    inputArr = data.split("\r\n")
    let instructions = inputArr[0]
    let networkArr = inputArr.slice(2)
    for (let node of networkArr) {
        network[`${node[0]}${node[1]}${node[2]}`] = {
            "L": `${node[7]}${node[8]}${node[9]}`,
            "R": `${node[12]}${node[13]}${node[14]}`
        }
    }
    let navigation = function () {
        for (let i = 0; i < instructions.length; i++) {
            steps += 1
            let direction = instructions[i]
            currentNode = network[currentNode][direction]
        }
        if (currentNode === "ZZZ") {
            console.log(steps)
        } else {
            navigation()
        }
    }
    navigation()
})