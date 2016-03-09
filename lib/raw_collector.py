from datetime import datetime
import os
from lib import config
from lib import downloader

today = datetime.today()
finish_year = today.year
finish_month = today.month

def collect(location):
	for year in range(config.START_YEAR, finish_year+1):
		for month in range(1, 12+1):
			collect_month(location, year, month)

def collect_month(location, year, month):
	if terminus_reached(year, month):
		return

	file_path = '{}/{}_{}_{}.json'.format(config.RAW_DIR, location, year, month)
	if os.path.isfile(file_path):
		return

	stream = downloader.fetch(location, year, month)
	with open(file_path, 'w') as handle:
		handle.write(stream)

def terminus_reached(year, month):
	return year == finish_year and month >= finish_month
