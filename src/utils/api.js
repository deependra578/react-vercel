import axios from 'axios';

//const API_BASE_URL = 'https://task-manager-app-cnabhaf0ereceah8.centralus-01.azurewebsites.net/'; // Replace with your API base URL
const API_BASE_URL = 'https://api.byteontap.tech/'; // Replace with your API base URL

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

// Function to set the Authorization token
export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

export const fetchData = async (endpoint) => {
    try {
        const response = await apiClient.get(`/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await apiClient.post(`/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const updateData = async (endpoint, data) => {
    try {
        const response = await apiClient.put(`/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await apiClient.delete(`/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};
