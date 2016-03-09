var Filter = function(params) {
	var monitor;
	var topContainer;
	var locations;
	var colorProvider;
	var yearField;
	var locationToggles;

	var init = function() {
		gatherDependencies();
		gatherComponents();
		build();
		addBehavior();
		selectSeattle();
	};

	var gatherDependencies = function() {
		monitor = params.monitor;
		topContainer = params.topContainer;
		locations = params.locations;
		colorProvider = params.colorProvider;
	};

	var gatherComponents = function() {
		yearField = topContainer.find('input[name=year]')
	};

	var build = function() {
		buildLocations();
		yearField
			.prop('min', params.years.min)
			.prop('max', params.years.max)
			.val(params.years.max -1)
			.change(onChange);
	};

	var buildLocations = function() {
		var locationsContainer = topContainer.find('ul.locations');
		locationToggles = [];

		$.each(locations, function(key, label) {
			var bgColor = colorProvider.get(key);
			var toggle = $('<li>')
				.appendTo(locationsContainer)
				.text(label)
				.click(toggleLocation)
				.data('key', key)
				.css('background-color', bgColor)
				.addClass('unselected');

			locationToggles.push(toggle);
		});
	};

	var addBehavior = function() {
		topContainer.find('a.next_year').click(incrementYear);
		topContainer.find('a.previous_year').click(decrementYear);
	};

	var incrementYear = function() {
		adjustYear(1);
	};

	var decrementYear = function() {
		adjustYear(-1);
	};

	var adjustYear = function(amount) {
		yearField = yearField.val(parseInt(yearField.val()) + amount);
		onChange();
	}

	var toggleLocation = function() {
		var li = $(this);
		if (li.hasClass('selected'))
			li.removeClass('selected');
		else
			li.addClass('selected');
		onChange();
	};

	var onChange = function() {
		monitor.onChange(getFilter());
	};

	var getFilter = function() {
		return {
			year:yearField.val(),
			locations:getSelectedLocations()
		};
	};

	var getSelectedLocations = function() {
		selected = [];
		$.each(locationToggles, function(index, toggle) {
			if (toggle.hasClass('selected'))
				selected.push(toggle.data('key'));
		});
		return selected;
	};

	var selectSeattle = function() {
		$.each(locationToggles, function(index, toggle) {
			if (toggle.data('key') == 4439) {
				toggle.click();
			}
		});
	};

	init();
};
