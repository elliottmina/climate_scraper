var ChartFactory = function(params) {
	var labels;
	var extraChartOptions;
	var chart;
	var chartLibFactory;
	var chartOptions = {
		datasetFill:false,
		pointDot:false,
		bezierCurve:false,
		animation:false,
		showTooltips:false,
		responsive:true,
		maintainAspectRatio:true,
		scaleShowVerticalLines:true,
		scaleGridLineColor:'rgba(255, 255, 255, 0.05)',
	};

	var init = function() {
		labels = params.chartLabels;

		var ctx = params.canvas.get(0).getContext('2d');
		chartLibFactory = new Chart(ctx);
	};

	init();

	return {
		build:function(datasets) {
			if (chart) chart.destroy();

			chart = chartLibFactory.Line(
				{labels:labels, datasets:datasets}, 
				chartOptions);
		}
	};
};
