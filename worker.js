var argFromParent = process.argv[2]
process.on("message",function(message){
		process.send({data : message.data,"response":argFromParent})
})
