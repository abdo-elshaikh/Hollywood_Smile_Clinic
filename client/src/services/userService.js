import axios from 'axios';

// Create an Axios instance with the base URL
const Base_Url = 'http://localhost:5001/api/users';

// add Auth header
const getHeader = () => {
    return {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
}

// Get all users
const getUsers = async () => {
    try {
        const response = await axios.get(Base_Url, { headers: getHeader() });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Delete a user
const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${Base_Url}/${id}`, { headers: getHeader() });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Update a user
const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${Base_Url}/${id}`, userData, { headers: getHeader() });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Get a user by ID
const getUserById = async (id) => {
    try {
        const response = await axios.get(`${Base_Url}/${id}`, { headers: getHeader() });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Create a new user
const createUser = async (userData) => {
    try {
        const response = await axios.post(Base_Url, userData, { headers: getHeader() });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// Define the user service functions that will be used in the application
const userService = {
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
    createUser,
};

// Named Exports
export {
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
    createUser,
};
