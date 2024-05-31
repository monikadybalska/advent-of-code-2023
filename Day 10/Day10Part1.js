const fs = require('fs');
let loop = []

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

let allSteps = []
readFileAsync("Example").then(function (data) {
    loop = data.split("\r\n")
    let sString = loop.filter((el) => el.includes("S"))[0]
    let sIndex = sString.indexOf("S")
    let sLine = loop.indexOf(sString)
    let currentLine = sLine
    let currentIndex = sIndex
    let steps = 1
    const move = function () {
        if (loop[currentLine][currentIndex] === "|" && currentLine < loop.length - 1) {
            currentLine += 1
            steps += 1
            move()
        } else if (loop[currentLine][currentIndex] === "L" && currentIndex < loop[0].length - 1) {
            currentIndex += 1
            steps += 1
            move()
        } else if (loop[currentLine][currentIndex] === "J" && currentLine > 0) {
            currentLine -= 1
            steps += 1
            move()
        } else if (loop[currentLine][currentIndex] === "7" && currentLine < loop.length - 1) {
            currentLine += 1
            steps += 1
            move()
        } else if (loop[currentLine][currentIndex] === "F" && currentIndex < loop[0].length - 1) {
            currentIndex += 1
            steps += 1
            move()
        } else if (loop[currentLine][currentIndex] === "-" && currentIndex < loop[0].length - 1) {
            currentIndex += 1
            steps += 1
            move()
        } else {
            allSteps.push(steps)
        }
    }
    if (currentIndex > 0 && loop[currentLine][currentIndex - 1] !== ".") {
        currentIndex -= 1
        console.log(loop[currentLine][currentIndex])
    } else if (currentIndex < loop[0].length - 1 && loop[currentLine][currentIndex + 1] !== ".") {
        currentIndex += 1
        console.log(loop[currentLine][currentIndex])
    } else if (currentLine > 0 && loop[currentLine - 1][currentIndex] !== ".") {
        currentLine -= 1
        console.log(loop[currentLine][currentIndex])
    } else if (currentLine < loop.length - 1 && loop[currentLine + 1][currentIndex] !== ".") {
        currentLine += 1
        console.log(loop[currentLine][currentIndex])
    }
    move()
    console.log(allSteps)
})