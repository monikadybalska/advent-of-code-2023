const fs = require('fs');
let nonSymbols = "*"
let gears = {}
const initialValue = 0;

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

readFileAsync("Day3").then(function (data) {
  inputArr = data.split("\r\n")
  let emptyLine = inputArr[0].replaceAll(/./g, '.')
  inputArr = [emptyLine, ...inputArr, emptyLine]
  inputArr = inputArr.map((el) => `.${el}.`)
  for (let i = 1; i < inputArr.length; i++) {
    let line = inputArr[i]
    let prevLine = inputArr[i - 1]
    let nextLine = inputArr[i + 1]
    let num = 0
    let gearCord = new Set()
    for (let j = 1; j < line.length; j++) {
      let dig = parseInt(line[j])
      if (!isNaN(dig)) {
        num *= 10
        num += dig
        if (nonSymbols.includes(line[j + 1])) {
          gearCord.add(JSON.stringify({ i: i, j: j + 1 }))
        }
        if (nonSymbols.includes(line[j - 1])) {
          gearCord.add(JSON.stringify({ i: i, j: j - 1 }))
        }
        if (nonSymbols.includes(prevLine[j])) {
          gearCord.add(JSON.stringify({ i: i - 1, j: j }))
        }
        if (nonSymbols.includes(prevLine[j - 1])) {
          gearCord.add(JSON.stringify({ i: i - 1, j: j - 1 }))
        }
        if (nonSymbols.includes(prevLine[j + 1])) {
          gearCord.add(JSON.stringify({ i: i - 1, j: j + 1 }))
        }
        if (nonSymbols.includes(nextLine[j])) {
          gearCord.add(JSON.stringify({ i: i + 1, j: j }))
        }
        if (nonSymbols.includes(nextLine[j - 1])) {
          gearCord.add(JSON.stringify({ i: i + 1, j: j - 1 }))
        }
        if (nonSymbols.includes(nextLine[j + 1])) {
          gearCord.add(JSON.stringify({ i: i + 1, j: j + 1 }))
        }
        if (isNaN(parseInt(line[j + 1])) || line[j + 1] === undefined) {
          for (let gear of gearCord) {
            if (Object.keys(gears).includes(gear)) {
              gears[gear].push(num)
            } else {
              gears[gear] = [num]
            }
          }
          gearCord = new Set()
          num = 0
        }
      }
    }
  }
  let values = Object.values(gears).filter((el) => el.length === 2)
  console.log(values.reduce(
    (accumulator, currentValue) => accumulator + currentValue[0] * currentValue[1],
    initialValue,
  ))
})