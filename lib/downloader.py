import requests

def fetch(location, year, month):
	print('fetching {}, {}, {}'.format(location, year, month))
	payload = {
		'location_id':location,
		'year_nr':year,
		'month_nr':month,
		'type':'american',
	}
	url = 'http://www.usclimatedata.com/php/history.php'
	return requests.post(url, data=payload).text
