import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-3-1b78de3f40a3.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;