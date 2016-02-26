var Worker = require("webworker-threads").Worker
var sample = require("./data/sample.json")
var format = require("util").format
var aggregateData = require("./libs/util").aggregateData
var collectResult = require("./libs/util").collectResult;
var cpuLength = require("os").cpus().length
var sampleLength = sample.length
console.log("Dataset size : %d",sampleLength)

function main(){
	var realDataLength = sampleLength / cpuLength;
	var result = {}
	function workerMain(){	
		this.onmessage = function(ev){
			var obj = {}
			var list = ev.data.list
			eval(ev.data.func)
			var result = aggregateData(list)
			postMessage(result);
			self.close();
		}
	}
	var doneCount = 0;
	console.time("Execution time")
	for(var i = 0;i < cpuLength;i++){
		var instance = new Worker(workerMain);
		var realList = sample.slice(i * realDataLength,(i + 1) * realDataLength)
		console.log("Create worker %d to compute %d data",i,realList.length)
		instance.onmessage = function(r){
			console.log("Done")
			doneCount += 1;
			result = collectResult(result,r.data)
			if(doneCount == cpuLength){
				console.timeEnd("Execution time")
			}
		}
		instance.postMessage({
			list : realList,
			func : aggregateData.toString()
		})
		// console.log(aggregateData.toString())
		console.log("Waiting result from worker %d",i)
		realList = null
	}
	sample = null
}

main();

