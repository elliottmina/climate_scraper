import json
import os
from dateutil import parser
from lib import summary_parser
from lib import daily_parser

def parse(raw_path):

	with open(raw_path, 'r') as stream:
		data = json.load(stream)
		
	dt = parser.parse('01 ' + data['month_year'])
	location = grossly_exctract_location_from_path(raw_path)

	return {
		'summary':summary_parser.parse(data['right']),
		'daily':daily_parser.parse(data['output']),
		'month':dt.month,
		'year':dt.year,
		'location':location,
	}

def grossly_exctract_location_from_path(path):
	return os.path.basename(path)[0:4]
