const fs = require('fs');

let image = []
let initialValue = 0
let xs = []
let ys = []
let pairsX = []
let pairsY = []
let galaxies = []
let sums = []
let sumOfSums = 0

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

readFileAsync("Day11").then(function (data) {
    image = data.split("\r\n")
    for (let i = image.length - 1; i >= 0; i--) {
        if (image[i].includes("#")) {
        } else {
            xs.push(i)
        }
    }
    let dots = false
    for (let i = image[0].length - 1; i >= 0; i--) {
        if (image[0][i] === ".") {
            dots = true
            for (let j = 1; j < image.length; j++) {
                if (image[j][i] === "#") {
                    dots = false
                }
            }
            if (dots === true) {
                ys.push(i)
            }
        }
    }
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
            if (image[i][j] === "#") {
                galaxies.push([i, j])
            }
        }
    }
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sums.push(Math.abs(galaxies[j][0] - galaxies[i][0]) + Math.abs(galaxies[j][1] - galaxies[i][1]))
            pairsX.push([galaxies[i][0], galaxies[j][0]])
            pairsY.push([galaxies[i][1], galaxies[j][1]])
        }
    }

    sumOfSums = Object.values(sums).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    )

    for (let i = 0; i < xs.length; i++) {
        for (let j = 0; j < pairsX.length; j++) {
            if (xs[i] > pairsX[j][0] && xs[i] < pairsX[j][1]) {
                sumOfSums += 999999
            } else if (xs[i] < pairsX[j][0] && xs[i] > pairsX[j][1]) {
                sumOfSums += 999999
            }
        }
    }

    for (let i = 0; i < ys.length; i++) {
        for (let j = 0; j < pairsY.length; j++) {
            if (ys[i] > pairsY[j][0] && ys[i] < pairsY[j][1]) {
                sumOfSums += 999999
            } else if (ys[i] < pairsY[j][0] && ys[i] > pairsY[j][1]) {
                sumOfSums += 999999
            }
        }
    }

    console.log(sumOfSums)
})



// for (let i = 0; i < galaxies.length; i++) {
//     for (let j = i + 1; j < galaxies.length; j++) {
//         sums[`${galaxies[i]}, ${galaxies[j]}`] = {
//             sum: Math.abs(galaxies[j][0] - galaxies[i][0]) + Math.abs(galaxies[j][1] - galaxies[i][1]),
//             xs: [galaxies[i][0], galaxies[j][0]],
//             ys: [galaxies[i][1], galaxies[j][1]]
//         }
//         pairsX.push([galaxies[i][0], galaxies[j][0]])
//         pairsY.push([galaxies[i][1], galaxies[j][1]])
//     }
// }

// for (let i = 0; i < xs.length; i++) {
//     for (let j = 0; j < pairsX.length; j++) {
//         if (xs[i] > pairsX[j][0] && xs[i] < pairsX[j][1]) {

//         }
//     }
// }
// console.log(sums)