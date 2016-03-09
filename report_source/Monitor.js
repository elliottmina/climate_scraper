var Monitor = function(params) {
	var dataReducer = params.dataReducer;
	var plotter = params.plotter;

	return {
		onChange:function(filter) {
			plotter.show(dataReducer.get(filter));
		}
	};
};
