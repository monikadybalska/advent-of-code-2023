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
        let n = history.length - 1
        let differences = history
        let lasts = []
        function findDifference() {
            copy = differences
            differences = []
            for (let j = 0; j < copy.length - 1; j++) {
                differences.push(diff(copy[j + 1], copy[j]))
            }
            lasts.push(differences[differences.length - 1])
            if (Math.max(...differences) === Math.min(...differences)) {
            } else {
                findDifference()
            }
        }
        findDifference()
        let nextDiff = (lasts.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        ))
        let next = history[n] + nextDiff
        nexts.push(next)
    }
    console.log(nexts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    ))
})

// readFileAsync("Example").then(function (data) {
//     report = data.split("\r\n")
//     for (let i = 0; i < report.length; i++) {
//         let history = report[i].split(" ").map((el) => parseInt(el))
//         let allDifferences = [history]
//         let n = allDifferences.length - 1
//         function findDifferences() {
//             let differences = []
//             for (let j = 0; j < allDifferences[n].length - 1; j++) {
//                 differences.push(diff(allDifferences[n][j + 1], allDifferences[n][j]))
//             }
//             allDifferences.push(differences)
//             n += 1
//             if (Math.max(...allDifferences[n]) === Math.min(...allDifferences[n])) {
//             } else {
//                 findDifferences()
//             }
//         }
//         findDifferences()
//         for (let j = allDifferences.length - 1; j > 0; j--) {
//             let currentLast = allDifferences[j][allDifferences[j].length - 1]
//             let nextLast = allDifferences[j - 1][allDifferences[j - 1].length - 1]
//             next = nextLast + currentLast
//             allDifferences[j - 1].push(next)
//         }
//         nexts.push(next)
//     }
//     console.log(nexts.reduce(
//         (accumulator, currentValue) => accumulator + currentValue,
//         initialValue,
//     ))
// })

