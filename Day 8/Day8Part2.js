const fs = require('fs');

let inputArr = []
let stepsArr = []
let network = {}
let aNodes = []

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

const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
};

readFileAsync("Day8").then(function (data) {
    inputArr = data.split("\r\n")
    let instructions = inputArr[0]
    let networkArr = inputArr.slice(2)
    for (let node of networkArr) {
        network[`${node[0]}${node[1]}${node[2]}`] = {
            "L": `${node[7]}${node[8]}${node[9]}`,
            "R": `${node[12]}${node[13]}${node[14]}`
        }
    }
    aNodes = Object.keys(network).filter((el) => el[2] === "A")
    for (let aNode of aNodes) {
        let currentNode = aNode
        let steps = 0
        function navigation() {
            for (let i = 0; i < instructions.length; i++) {
                steps += 1
                currentNode = network[currentNode][instructions[i]]
            }
            if (currentNode[2] === "Z") {
                stepsArr.push(steps)
            } else {
                navigation()
            }
        }
        navigation()
    }
    console.log(lcm(...stepsArr))
})