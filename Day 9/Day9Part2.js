const fs = require('fs');

let report = []
let nexts = []
let initialValue = 0

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

let diff = function (num1, num2) {
    return num1 - num2
}

readFileAsync("Day9").then(function (data) {
    report = data.split("\r\n")
    for (let i = 0; i < report.length; i++) {
        let history = report[i].split(" ").map((el) => parseInt(el))
        let differences = history
        let firsts = []
        function findDifference() {
            copy = differences
            differences = []
            for (let j = 0; j < copy.length - 1; j++) {
                differences.push(diff(copy[j + 1], copy[j]))
            }
            firsts.push(differences[0])
            if (Math.max(...differences) === Math.min(...differences)) {
            } else {
                findDifference()
            }
        }
        findDifference()
        let next = 0
        let nextDiff = firsts[firsts.length - 1]
        for (let j = firsts.length - 1; j > 0; j--) {
            next = firsts[j - 1] - nextDiff
            nextDiff = next
        }
        next = history[0] - nextDiff
        nexts.push(next)
    }
    console.log(nexts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    ))
})