import json

class DataPersister(object):
	def __init__(self, dir):
		self.dir = dir

	def save(self, data, location):
		with open(self.get_file_name(data, location), 'w') as handle:
			json.dump(data, handle)

	def get_file_name(self, data, location):
		return '{}/{}_{}.json'.format(self.dir, location, data['month'])
