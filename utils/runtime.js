var runtime = {
	db: {
		mongo: {
			users: null
		}
	}
};


function getRuntimeKey(key) {
	return runtime[key];
}

function getRuntime() {
	return runtime;
}

function setRuntime(key, val) {
	runtime[key] = val;
}

module.exports = {
	getRuntimeKey,
	getRuntime,
	setRuntime
}