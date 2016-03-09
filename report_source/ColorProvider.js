var ColorProvider = function() {
	var colors = [
		{r:242, g:89, b:93},
		{r:120, g:196, b:102},
		{r:87, g:154, b:214},
		{r:252, g:168, b:83},
		{r:159, g:102, b:173},
		{r:208, g:113, b:87},
		{r:217, g:125, b:181},
	];

	var known = [];

	var getIndex = function(id) {
		var index = $.inArray(id, known);
		if (index == -1) {
			known.push(id);
			index = $.inArray(id, known);
		}
		return index;
	};

	var buildCss = function(color, opacity) {
		return 'rgba(' + 
			color.r + ', ' + 
			color.g + ', ' + 
			color.b + ', ' + 
			opacity + ')';
	};

	return {
		get:function(id, opacity) {
			if (!opacity)
				opacity = 1;
			var index = getIndex(id);
			return buildCss(colors[index], opacity);
		}
	};
};