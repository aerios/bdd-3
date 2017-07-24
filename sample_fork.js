var fork = require("child_process").fork
var inst = fork(__dirname+"/worker.js",["this is argument"])
inst.on("message",function(message){
		console.log(message)
})
console.log("Sending message to worker")
inst.send({data:"Hi worker"})
