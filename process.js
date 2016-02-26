var isChild = process.argv[2] == "child"

function main(){
	
	if(!isChild){
		var format = require("util").format
		var fork = require("child_process").fork
		var cpuLength = require("os").cpus().length
		var collectResult = require("./libs/util").collectResult;
		var sample = require("./data/sample.json")	
		var realDataLength = sample.length / cpuLength
		var finalResult = {};
		var doneCount = 0;
		console.log("Dataset size : %d",sample.length)
		console.time("Execution time")		
		for(var i = 0;i < cpuLength;i++){
			var instance = fork(__filename,["child"]);
			var realList = sample.slice(i * realDataLength,(i + 1) * realDataLength)
			console.log("Create worker %d to compute %d data",i,realList.length)			
			console.log("Waiting result from worker %d",i)
			instance.on("message",function(result){
				doneCount += 1
				finalResult = collectResult(finalResult,result)
				if(doneCount == cpuLength){
					console.timeEnd("Execution time");
				}
			})	
			instance.send(realList)
			realList = null;
		}
		sample = null;
	}else{
		var aggregateData = require("./libs/util").aggregateData
		console.log("Worker spawned")
		process.on("message",function(data){
			var result = aggregateData(data)
			process.send(result);
			process.exit()
		})
	}
	
}
main()



