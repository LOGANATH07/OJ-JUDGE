import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (email:string, password:string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to login');
    }
}

export const registerUser = async(firstName: string, lastName: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { firstName, lastName, email, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to register');
    }
}