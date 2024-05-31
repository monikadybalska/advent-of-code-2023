const fs = require('fs');

let inputArr = []
let seeds = []

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

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

let allMaps = {
    "seedTosoil": {
        source: [],
        destination: [],
        range: []
    },
    "soilTofertilizer": {
        source: [],
        destination: [],
        range: []
    },
    "fertilizerTowater": {
        source: [],
        destination: [],
        range: []
    },
    "waterTolight": {
        source: [],
        destination: [],
        range: []
    },
    "lightTotemperature": {
        source: [],
        destination: [],
        range: []
    },
    "temperatureTohumidity": {
        source: [],
        destination: [],
        range: []
    },
    "humidityTolocation": {
        source: [],
        destination: [],
        range: []
    }
}
let currentMap = {}
readFileAsync("Example").then(function (data) {
    inputArr = data.split("\r\n").map((line) => line.replace(" map:", "")).map((line) => line.replace("-to-", "To"))
    for (let line of inputArr) {
        if (line.includes("seeds")) {
            seeds = line.match(/\d+/g).map((el) => parseInt(el))
        } else if (allMaps[line]) {
            currentMap = allMaps[line]
        } else if (line.match(/\d+/g)) {
            let numbers = line.match(/\d+/g).map((el) => parseInt(el))
            currentMap["source"].push(numbers[1])
            currentMap["destination"].push(numbers[0])
            currentMap["range"].push(numbers[2])
        }
    }
    let minLocation = -1
    for (let i = 0; i < seeds.length; i += 2) {
        console.log(i)
        let start = seeds[i]
        let stop = seeds[i] + seeds[i + 1]
        console.log(start)
        console.log(stop)
        for (let seed = start; seed <= stop; seed++) {
            let soil = getMapping(allMaps["seedTosoil"], seed)
            let fertilizer = getMapping(allMaps["soilTofertilizer"], soil)
            let water = getMapping(allMaps["fertilizerTowater"], fertilizer)
            let light = getMapping(allMaps["waterTolight"], water)
            let temperature = getMapping(allMaps["lightTotemperature"], light)
            let humidity = getMapping(allMaps["temperatureTohumidity"], temperature)
            let location = getMapping(allMaps["humidityTolocation"], humidity)
            minLocation = minLocation !== -1 ? Math.min(minLocation, location) : location
        }
    }
    console.log(minLocation)
})