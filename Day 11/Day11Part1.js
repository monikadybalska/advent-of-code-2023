const fs = require('fs');

let image = []
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

let galaxies = []
let sums = []
readFileAsync("Example").then(function (data) {
    image = data.split("\r\n")
    let newImage = image.slice()
    for (let i = image.length - 1; i >= 0; i--) {
        if (image[i].includes("#")) {
        } else {
            let firstHalf = newImage.slice(0, i)
            let secondHalf = newImage.slice(i)
            newImage = [...firstHalf, image[i], ...secondHalf]
        }
    }
    image = newImage
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
                newImage = newImage.map((el) => el.slice(0, i) + "." + el.slice(i))
            }
        }
    }
    image = newImage
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
        }
    }

    console.log(Object.values(sums).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    ))
})
