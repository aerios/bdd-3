function _collect(result,data){
	for(var i in data){
		if(!result[i]){
			result[i] = 0
		}
		result[i] += data[i]
	}
	return result;
}

function aggregateData(list){
	var obj = {
		count:{},
		user:{},
		peak_time:{},
		word_cloud:{},
		top_post:[]
	}
	for(var i in list){
		var d = list[i]
		var name = d.user.screen_name;
		var dateObj = new Date(d.created_at)
		var date = dateObj.toDateString()
		var hours = dateObj.getUTCHours()		
		var words = d.text.split(/\S\s/)
		if(!obj.count[date]){
			obj.count[date] = 0
		}
		if(!obj.user[name]){
			obj.user[name] = 0
		}
		if(!obj.peak_time[hours]){
			obj.peak_time[hours] = 0
		}
		for(var wi in words){
			var w = words[wi].toLowerCase()
			if(!obj.word_cloud[w]){
				obj.word_cloud[w] = 0
			}
			obj.word_cloud[w] += 1;
		}
		obj.peak_time[hours] += 1;
		obj.user[name] += 1;
		obj.count[date] += 1		
	}
	var wordCloud = {};
	for(var x in obj.word_cloud){
		if(x.length > 3){
			wordCloud[x] = obj.word_cloud[x];
		}
	}
	obj.word_cloud = wordCloud;
	obj.top_post = list.sort(function(item){return 0-item.retweet_count}).slice(0,10)
	return obj;
}

function collectResult(result,data){
	for(var key in data){
		var member = data[key]
		if(!result[key])result[key] = {}
		result[key] = _collect(result[key],member)		
	}
	return result;
}

module.exports = {
	aggregateData : aggregateData,
	collectResult : collectResult 
}