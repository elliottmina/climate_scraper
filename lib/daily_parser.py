from htmldom import htmldom
from dateutil import parser

def parse(raw_json):
	dom = htmldom.HtmlDom().createDom(raw_json)
	data = {}
	for row in dom.find('tr'):
		build_row_data(row, data)
	return data

def build_row_data(row, data):
	cells = list(row.find('td'))
	if cells:
		dt = parser.parse(cells[0].text())
		date = dt.strftime('%Y-%m-%d')
		data[date] = {
			'date': date,
			'high': parse_variable_format(cells[1].text()),
			'low': parse_variable_format(cells[2].text()),
			'precip': parse_variable_format(cells[3].text()),
			'snow': parse_variable_format(cells[4].text()),
		}

def parse_variable_format(str_value):
	if str_value == 'T' or str_value == '-':
		return 0.0
	return float(str_value)
