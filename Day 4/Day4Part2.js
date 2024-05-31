const fs = require('fs');

let sum = 0
let initialValue = 0
let inputArr = []
let cards = {}

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
  for(let i = 0; i < inputArr.length; i++) {
    cards[i + 1] = 1
  }
  for(let card of inputArr) {
    let sum = 0
    let winning = card[0]
    let mine = card[1]
    let cardNumber = inputArr.indexOf(card) + 1
    for(let i = 0; i < winning.length; i++) {
        if(mine.includes(winning[i])) {
            sum += 1
        }
    }
    if(sum >= 1) {
        for(let i = 1; i <= sum; i++) {
            cards[cardNumber + i] += (1 * cards[cardNumber])
        }
    }
  }
  console.log(Object.values(cards).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
  ))
})