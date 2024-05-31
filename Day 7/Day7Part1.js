const fs = require('fs');
let inputArr = []
let set = []
let sum = 0
let initRank = 1
let winnings = 0
let types = {
    "fiveOfAKind": [5],
    "fourOfAKind": [1, 4],
    "fullHouse": [2, 3],
    "threeOfAKind": [1, 1, 3],
    "twoPair": [1, 2, 2],
    "onePair": [1, 1, 1, 2],
    "highCard": [1, 1, 1, 1, 1]
}
let labelOrder = {
    "2": 5,
    "3": 10,
    "4": 15,
    "5": 20,
    "6": 25,
    "7": 30,
    "8": 35,
    "9": 40,
    "T": 45,
    "J": 50,
    "Q": 55,
    "K": 60,
    "A": 65
}

let arrayEquals = function (a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

let compareFn = function (a, b) {
    return a - b;
}

let compareCards = function (a, b) {
    if (labelOrder[a["name"][0]] === labelOrder[b["name"][0]]) {
        if (labelOrder[a["name"][1]] === labelOrder[b["name"][1]]) {
            if (labelOrder[a["name"][2]] === labelOrder[b["name"][2]]) {
                if (labelOrder[a["name"][3]] === labelOrder[b["name"][3]]) {
                    return labelOrder[a["name"][4]] - labelOrder[b["name"][4]]
                } else
                    return labelOrder[a["name"][3]] - labelOrder[b["name"][3]]
            } else
                return labelOrder[a["name"][2]] - labelOrder[b["name"][2]]
        } else
            return labelOrder[a["name"][1]] - labelOrder[b["name"][1]]
    } else
        return labelOrder[a["name"][0]] - labelOrder[b["name"][0]];
}

let sortForRanks = function (el) {
    if (el) {
        el = el.sort(compareCards)
    }
}

let giveRank = function (el) {
    if (el) {
        for (let i = 0; i < el.length; i++) {
            el[i]["rank"] = initRank
            initRank += 1
        }
    }
}

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

readFileAsync("Day7").then(function (data) {
    inputArr = data.split("\r\n").map((el) => el.split(" "))

    for (let line of inputArr) {
        set.push({
            "name": line[0],
            "bid": line[1],
            "type": "",
            "rank": 1,
            "cards": {}
        })
    }

    for (let i = 0; i < set.length; i++) {
        let hand = set[i]
        let handName = hand["name"]
        sum = 0
        for (let j = 0; j < handName.length; j++) {
            let label = handName[j]
            sum = 0
            for (let k = 0; k < handName.length; k++) {
                if (handName[j] === handName[j - k]) {
                    sum += 1
                }
                hand["cards"][label] = sum
            }
        }
        let values = Object.values(hand["cards"]).sort(compareFn)
        for (let t = 0; t < Object.values(types).length; t++) {
            if (arrayEquals(values, Object.values(types)[t])) {
                hand["type"] = Object.keys(types)[t]
            }
        }
    }

    set = set.reduce((x, y) => {
        (x[y.type] = x[y.type] || []).push(y);
        return x;
    }, {})

    sortForRanks(set["highCard"])
    sortForRanks(set["onePair"])
    sortForRanks(set["twoPair"])
    sortForRanks(set["threeOfAKind"])
    sortForRanks(set["fullHouse"])
    sortForRanks(set["fourOfAKind"])
    sortForRanks(set["fiveOfAKind"])

    giveRank(set["highCard"])
    giveRank(set["onePair"])
    giveRank(set["twoPair"])
    giveRank(set["threeOfAKind"])
    giveRank(set["fullHouse"])
    giveRank(set["fourOfAKind"])
    giveRank(set["fiveOfAKind"])

    let groups = Object.keys(set)
    for (let i = 0; i < groups.length; i++) {
        let key = groups[i]
        for (let j = 0; j < set[key].length; j++) {
            console.log(`${set[key][j]["name"]}:${set[key][j]["rank"]}`)
            set[key][j]["bid"] = parseInt(set[key][j]["bid"])
            winnings += set[key][j]["bid"] * set[key][j]["rank"]
        }
    }
    // console.log(winnings)
})