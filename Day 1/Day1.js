const fs = require('fs');

let sum = 0
let inputArr = []
let numWords = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9"
}
let keys = Object.keys(numWords)

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

readFileAsync("Day1").then(function(data) {
  inputArr = data.split("\n")
  for(let line of inputArr) {
    for(let key of keys) {
      line = line.replaceAll(key, `${key}${numWords[key]}${key}`)
    }
    let numbers = line.match(/\d/g)
    if(numbers.length === 1) {
      let number = parseInt(`${numbers[0]}${numbers[0]}`)
      sum += number
    } else {
      let number = parseInt(`${numbers[0]}${numbers[numbers.length-1]}`)
      sum += number
    }
  }
  console.log(sum)
})