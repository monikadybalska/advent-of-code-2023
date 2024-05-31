const fs = require('fs');

let patterns = []
let initialValue = 0

const arrayEquals = function (a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

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

let sums = []
readFileAsync("Day13").then(function (data) {
    patterns = data.split("\r\n\r\n");
    patterns = patterns.map((el) => el.split("\r\n"))
    for (let pattern of patterns) {
        let sum = 0
        for (let i = 0; i < pattern.length - 1; i++) {
            if (pattern[i] === pattern[i + 1]) {
                let partOne = pattern.slice(0, i + 1).reverse()
                let partTwo = pattern.slice(i + 1)
                if (partOne.length > partTwo.length) {
                    partOne = partOne.slice(0, partTwo.length)
                }
                if (partTwo.length > partOne.length) {
                    partTwo = partTwo.slice(0, partOne.length)
                }
                if (arrayEquals(partOne, partTwo)) {
                    sum = 100 * (i + 1)
                }
            }
        }
        for (let j = 0; j < pattern[0].length - 1; j++) {
            if (pattern[0][j] === pattern[0][j + 1]) {
                let isMirrored = true
                for (let i = 0; i < pattern.length - 1; i++) {
                    if (pattern[i][j] !== pattern[i][j + 1]) {
                        isMirrored = false
                    }
                }
                if (isMirrored === true) {
                    let partOne = pattern.map((el) => el.slice(0, j + 1))
                    let partTwo = pattern.map((el) => el.slice(j + 1))
                    if (partOne[0].length === partTwo[0].length) {
                        partOne = partOne.map((el) => [...el].reverse().join(""))
                    }
                    if (partOne[0].length > partTwo[0].length) {
                        partOne = partOne.map((el) => el.slice(partOne[0].length - partTwo[0].length)).map((el) => [...el].reverse().join(""))
                    }
                    if (partTwo[0].length > partOne[0].length) {
                        partTwo = partTwo.map((el) => el.slice(0, partOne[0].length)).map((el) => [...el].reverse().join(""))
                    }
                    console.log(partOne, partTwo)
                    if (arrayEquals(partOne, partTwo)) {
                        console.log("ok")
                        sum = j + 1
                    }
                }
            }
        }
        sums.push(sum)
    }
    console.log(sums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    ))
})