import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

const get = async (endpoint, parameters = {}) => {
    return await axios.get(`${API_URL}${endpoint}`, parameters);
};

const post = async (endpoint, data = {}) => {
    return await axios.post(`${API_URL}${endpoint}`, data);
};

const remove = async (endpoint, data = {}) => {
    return await axios.delete(`${API_URL}${endpoint}`, data);
};

export {
    get,
    post,
    remove
};
