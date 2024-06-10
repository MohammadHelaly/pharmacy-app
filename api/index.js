import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: "https://portal-test.rxmaxreturns.com/rxmax",
	headers: {
		"Content-Type": "application/json",
	},
});

// api.interceptors.request.use((request) => {
// 	console.log("Request: ", request);
// 	return request;
// });

// api.interceptors.response.use((response) => {
// 	console.log("Response: ", response);
// 	return response;
// });

export default api;
