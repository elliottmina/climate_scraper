var ChartLabels = function(params) {
	var labels = [];

	var i = 0;
	var date = new Date(2015, 0, 0);
	while (i <= 365) {
		labels.push(date.getMonth()+1 + '-' + date.getDate());
	
		date.setDate(date.getDate() + params.config.dayGranularity);
		i += params.config.dayGranularity;
	}
	return labels;
};
