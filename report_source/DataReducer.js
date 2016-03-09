var DataReducer = function(params) {
	data = params.data;
	
	var get = function(filter) {
		var reduced = [];
		$.each(filter.locations, function(index, loc) {
			buildLocations(loc, reduced, filter);
		});
		return reduced;
	};

	var buildLocations = function(loc, reduced, filter) {
		reduced.push({
			location:loc,
			high:data[loc][filter.year].high,
			low:data[loc][filter.year].low,
			precip:data[loc][filter.year].precip,
			snow:data[loc][filter.year].snow,
		});
	};

	return {
		get:get
	}
};
