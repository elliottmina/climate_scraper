import os

def collect(target_dir):
	paths = []
	for basename in os.listdir(target_dir):
		path = target_dir + '/' + basename
		if os.path.isfile(path):
			paths.append(path)
	return paths
