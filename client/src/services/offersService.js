import axios from "axios";
const Base_Url = "http://localhost:5001/api/offers";

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: Base_Url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
});


export const getOffers = async () => {
    try {
        const response = await axios.get(Base_Url);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const createOffer = async (offerData) => {
    try {
        const response = await api.post('/', offerData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateOffer = async (id, offerData) => {
    try {
        const response = await api.put(`/${id}`, offerData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteOffer = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export default api;