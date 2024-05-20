import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

axios.defaults.withCredentials = true;

const get = async (endpoint, parameters = {}) => {
    return await axios.get(`${SERVER_URL}${endpoint}`, parameters);
};

const post = async (endpoint, data = {}) => {
    return await axios.post(`${SERVER_URL}${endpoint}`, data);
};

const remove = async (endpoint, data = {}) => {
    return await axios.delete(`${SERVER_URL}${endpoint}`, data);
};

export {
    get,
    post,
    remove
};
