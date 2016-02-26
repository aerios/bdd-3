var fork = require("child_process").fork
var inst = fork(__dirname+"/worker.js",["this is argument"])
	inst.on("message",function(message){
		console.log(message)
})
inst.send({data:"Hi worker"})
