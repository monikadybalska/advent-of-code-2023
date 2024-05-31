const fs = require('fs');

let sum = 0
let inputArr = []
let totalPoints = 0

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

readFileAsync("Day4").then(function(data) {
  inputArr = data.split("\r\n").map((el) => el.replace(/.+(?=:)/, "")).map((el) => el.replace(":", "")).map((el) => el.trim()).map((el) => el.split("|")).map((line) => line.map((el) => el.match(/\d+/g)))
  for(let card of inputArr) {
    let sum = 0
    let winning = card[0]
    let mine = card[1]
    for(let i = 0; i < winning.length; i++) {
        if(mine.includes(winning[i])) {
            if(sum === 0) {
                sum += 1
            } else {
                sum *= 2
            }
        }
    }
    totalPoints += sum
  }
  console.log(totalPoints)
})