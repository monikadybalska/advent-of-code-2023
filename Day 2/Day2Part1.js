const fs = require('fs');
const initialValue = 0
const reds = 12
const greens = 13
const blues = 14
let possibleGames = []

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
    let blueGame = game.match(/\d+(?=\ blue)/g).map((el) => parseInt(el)).filter((el) => el > blues)
    let redGame = game.match(/\d+(?=\ red)/g).map((el) => parseInt(el)).filter((el) => el > reds)
    let greenGame = game.match(/\d+(?=\ green)/g).map((el) => parseInt(el)).filter((el) => el > greens)
    if (blueGame.length === 0 && redGame.length === 0 && greenGame.length === 0) {
        possibleGames.push(inputArr.indexOf(game) + 1)
    }
  }
  console.log(possibleGames.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue))
})