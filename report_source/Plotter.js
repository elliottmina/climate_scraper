var Plotter = function(params) {
	var colors;
	var chartFactories;

	var init = function() {
		colors = params.colorProvider;
		chartFactories = params.chartFactories;

		buildLandmarks();
	};

	var buildLandmarks = function() {
		landmarks = [];
		for (var i = 0; i < 3; i++) {
			landmarks.push({
				data:[],
				strokeColor:'rgba(255, 255, 0, 0.1)',
			});
		}

		for (var i = 0; i < params.chartLabels.length; i++) {
			landmarks[0].data.push(90);
			landmarks[1].data.push(70);
			landmarks[2].data.push(50);
		}
	};

	var insertLandmarks = function(plots) {
		for (var i in landmarks) {
			plots.push(landmarks[i]);
		}
	};

	var buildPlots = function(yearlySets) {
		var plots = {
			temp:[],
			precip:[],
			snow:[],
		};
		$.each(yearlySets, function(index, yearlySet) {
			plots.temp.push({
				data:yearlySet.high,
				strokeColor:colors.get(yearlySet.location),
			});
			plots.temp.push({
				data:yearlySet.low,
				strokeColor:colors.get(yearlySet.location, 0.5),
			});
			plots.precip.push({
				data:yearlySet.precip,
				strokeColor:colors.get(yearlySet.location),
			});
			plots.snow.push({
				data:yearlySet.snow,
				strokeColor:colors.get(yearlySet.location),
			});
		});

		insertLandmarks(plots.temp);

		return plots;
	};

	init();

	return {
		show:function(yearlySets) {
			plots = buildPlots(yearlySets);
			$.each(chartFactories, function(key, factory) {
				factory.build(plots[key]);
			});
		}
	};
};
