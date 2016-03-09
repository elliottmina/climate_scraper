import re
from htmldom import htmldom

def parse(raw_json):
	dom = htmldom.HtmlDom().createDom(raw_json)
	label_cells = dom.find('td.totals_left_column')
	raw_items = build_raw_items(label_cells)
	return refine_items(raw_items)

def build_raw_items(label_cells):
	data = {}
	for label_cell in label_cells:
		build_raw_item(label_cell, data)
	return data

def build_raw_item(label_cell, data):
	data[label_cell.text()] = label_cell.next().text()

def refine_items(raw_items):
	return {
		'avg_high':	parse_temp(raw_items['Average high temperature:']),
		'avg_low':	parse_temp(raw_items['Average low temperature:']),
		'max_high':	parse_temp(raw_items['Highest max temperature:']),
		'min_high':	parse_temp(raw_items['Lowest max temperature:']),
		'max_low':	parse_temp(raw_items['Highest min temperature:']),
		'min_low':	parse_temp(raw_items['Lowest min temperature:']),
		'avg':		parse_float_plus(raw_items['Average temperature:']),
		'snow':		parse_float_plus(raw_items['Total snowfall:']),
		'precip':	parse_float_plus(raw_items['Total Precipitation:']),
	}

def parse_temp(string_temp):
	result = re.match('([0-9\.]+)', string_temp)
	if result is None:
		return None
	return float(result.group(1))

def parse_float_plus(raw_value):
	result = re.match('([0-9\.]+)', raw_value)
	if result is None:
		return None
	return float(result.group(1))
