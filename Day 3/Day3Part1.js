const fs = require('fs');
let nonSymbols = "0123456789."
let nums = []
let part = false
const initialValue = 0;

const readFileAsync = async function(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, "utf8", function(err, data){ 
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

readFileAsync("Day3").then(function(data) {
  inputArr = data.split("\r\n")
  let emptyLine = inputArr[0].replaceAll(/./g, '.')
  inputArr = [emptyLine, ...inputArr, emptyLine]
  inputArr = inputArr.map((el) => `.${el}.`)
  for(let i = 1; i < inputArr.length - 1; i++) {
    let line = inputArr[i]
    let prevLine = inputArr[i - 1]
    let nextLine = inputArr[i + 1]
    let num = 0
    for(let j = 1; j < line.length - 1; j++) {
        let dig = parseInt(line[j])
        if(!isNaN(dig)) {
            num *= 10
            num += dig
            if(nonSymbols.includes(line[j+1]) && nonSymbols.includes(line[j - 1]) &&
            nonSymbols.includes(prevLine[j]) && nonSymbols.includes(prevLine[j - 1]) && 
            nonSymbols.includes(prevLine[j + 1]) && nonSymbols.includes(nextLine[j]) && 
            nonSymbols.includes(nextLine[j - 1]) && nonSymbols.includes(nextLine[j + 1])) {
                // console.log("ok")
            } else {
                part = true
            }   
            if(isNaN(parseInt(line[j + 1])) || line[j + 1] === undefined) {
                if(part === true) {
                    nums.push(num)
                }
                num = 0
                part = false
            }
        }
    }
  }
  console.log(nums.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
  ))
})