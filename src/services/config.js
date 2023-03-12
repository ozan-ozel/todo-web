const getEnvVar = (variableName) => {
	if (window.env && window.env[variableName]) {
		return window.env[variableName];
	}
	return null;
};

const getEnv = (name) => {
	return `${getEnvVar(name) ?? process.env[name]}`;
};

const apiRoot = () => {
	return getEnv("REACT_APP_API_ROOT");
};

const version = () => {
	return getEnv("REACT_APP_VERSION");
};

const environment = () => getEnv("REACT_APP_NODE_ENV");

const Config = {
	getEnvVar,
	getEnv,
	apiRoot,
	environment,
	version,
};

export default Config;
