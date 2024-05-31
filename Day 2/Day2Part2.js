const fs = require('fs');
const reds = 12
const greens = 13
const blues = 14
let sum = 0

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

readFileAsync("Day2").then(function(data) {
  inputArr = data.split("\n")
  for(let game of inputArr) {
    let blueGame = game.match(/\d+(?=\ blue)/g).map((el) => parseInt(el))
    let redGame = game.match(/\d+(?=\ red)/g).map((el) => parseInt(el))
    let greenGame = game.match(/\d+(?=\ green)/g).map((el) => parseInt(el))
    let power = Math.max(...blueGame) * Math.max(...redGame) * Math.max(...greenGame)
    sum += power
    }
  console.log(sum)
})