var sample = require("./data/sample.json")
var format = require("util").format
var aggregateData = require("./libs/util").aggregateData

console.log("Dataset size : %d",sample.length)
console.time("Execution time")
var result = aggregateData(sample)
var x = console.timeEnd("Execution time")



