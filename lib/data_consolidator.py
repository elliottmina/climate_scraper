from datetime import datetime
import json
import os
from lib import config
from lib.locations import LOCATIONS

current_year = datetime.today().year

def build():
	data = {}
	for loc in LOCATIONS.keys():
		build_loc(data, loc)
	return data

def build_loc(data, loc):
	data[loc] = {}

	for year in range(config.START_YEAR, current_year+1):
		build_year(data[loc], loc, year)

def build_year(data, loc, year):
		all_values = {
			'precip':[],
			'snow':[],
			'high':[],
			'low':[],
			# 'avg_high':[],
		}
		for month in range(1, 12+1):
			build_month(all_values, loc, year, month)
		
		data[year] = {}
		for key, items in all_values.items():
			data[year][key] = get_weekly_average(all_values[key])

def build_month(data, loc, year, month):
	source_path = '{}/{}_{}_{}.json'.format(config.DATA_DIR, loc, year, month)

	if os.path.isfile(source_path):
		with open(source_path) as source_stream:
			month_data = json.load(source_stream)

		for day, day_data in month_data['daily'].items():
			for key, value in day_data.items():
				if key in data:
					data[key].append(value)

def get_weekly_average(days):
	averages = []

	for i in range(0, len(days), config.REPORT_DAY_GRANULARITY):
		non_zeros = [x for x in days[i:i+config.REPORT_DAY_GRANULARITY] if x != 0]
		averages.append(get_average(non_zeros))
	return averages

def get_average(days):
	if len(days) > 0:
		return sum(days)/len(days)
	else:
		return 0

