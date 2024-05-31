const fs = require('fs');

let inputArr = []
let seeds = []
let seedTosoil = {
    source: [],
    destination: [],
    range: []
}
let soilTofertilizer = {
    source: [],
    destination: [],
    range: []
}
let fertilizerTowater = {
    source: [],
    destination: [],
    range: []
}
let waterTolight = {
    source: [],
    destination: [],
    range: []
}
let lightTotemperature = {
    source: [],
    destination: [],
    range: []
}
let temperatureTohumidity = {
    source: [],
    destination: [],
    range: []
}
let humidityTolocation = {
    source: [],
    destination: [],
    range: []
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

let getMapping = function (mapping, sourceValue) {
    for (let i = 0; i < mapping.source.length; i++) {
        let min = mapping.source[i]
        let max = mapping.source[i] + mapping.range[i] - 1
        if (sourceValue >= min && sourceValue <= max) {
            return mapping.destination[i] + sourceValue - min
        }
    }
    return sourceValue
}
let locations = []
let currentMap = {}
readFileAsync("Day5").then(function (data) {
    inputArr = data.split("\r\n").map((line) => line.replace(" map:", "")).map((line) => line.replace("-to-", "To"))
    for (let line of inputArr) {
        if (line.includes("seeds")) {
            seeds = line.match(/\d+/g).map((el) => parseInt(el))
        } else if (line.includes("seedTosoil")) {
            currentMap = seedTosoil
        } else if (line.includes("soilTofertilizer")) {
            currentMap = soilTofertilizer
        } else if (line.includes("fertilizerTowater")) {
            currentMap = fertilizerTowater
        } else if (line.includes("waterTolight")) {
            currentMap = waterTolight
        } else if (line.includes("lightTotemperature")) {
            currentMap = lightTotemperature
        } else if (line.includes("temperatureTohumidity")) {
            currentMap = temperatureTohumidity
        } else if (line.includes("humidityTolocation")) {
            currentMap = humidityTolocation
        } else if (line.match(/\d+/g)) {
            let numbers = line.match(/\d+/g).map((el) => parseInt(el))
            currentMap["source"].push(numbers[1])
            currentMap["destination"].push(numbers[0])
            currentMap["range"].push(numbers[2])
        }
    }
    for (let seed of seeds) {
        let soil = getMapping(seedTosoil, seed)
        let fertilizer = getMapping(soilTofertilizer, soil)
        let water = getMapping(fertilizerTowater, fertilizer)
        let light = getMapping(waterTolight, water)
        let temperature = getMapping(lightTotemperature, light)
        let humidity = getMapping(temperatureTohumidity, temperature)
        let location = getMapping(humidityTolocation, humidity)
        locations.push(location)
    }
    console.log(Math.min(...locations))
})