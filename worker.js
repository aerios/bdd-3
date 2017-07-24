var argFromParent = process.argv[2]
console.log("Worker initiating with argument",argFromParent)
console.log("Binding to message")
process.on("message",function(message){
		process.send({data : message.data,"response":argFromParent})
})
