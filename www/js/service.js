var API_ROOT_URL = 'http://192.168.25.25:8000'

var parse_json = function(raw_json){
	return eval("(function(){return " + raw_json + ";})()");
};

var fetch_matches = function(){
	var url = API_ROOT_URL + '/api/matches_by_groups/';
};