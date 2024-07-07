import axios from "axios";

// const API_URL = "http://localhost:8000";
const API_URL = "http://13.127.10.79:8000";
// const API_URL = "http://13.201.46.22:5000";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to login');
    }
}

export const registerUser = async(firstname, lastname, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { firstname, lastname, email, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to register');
    }
}

export const postProblem = async(title,description,problemId,level,category)=>{
    try {
        const response = await axios.post(`${API_URL}/postproblem`, {title,description,problemId,level,category});
        return response.data;
    } catch (error) {
        console.log('Error while trying to post problem');
    }
}

export const postTestCases = async(problemId,testcases)=>{
    try {
        const response = await axios.post(`${API_URL}/posttestcases`,{problemId,testcases});
        return response.data;
    } catch (error) {
        console.log('Error while trying to post test cases');
    }
}

export const getProblemFromServer = async (problemId) => {
    try {
        const response = await axios.get(`${API_URL}/getproblem`,{
            params: { problemId: problemId }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to get problems');
    }
}

export const getAllProblemsFromServer = async () => {
    try {
        const response = await axios.get(`${API_URL}/allproblems`);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to get problems');
    }
}

export const getTestcasesFromServer = async (problemId) => {
    try {
        const response = await axios.get(`${API_URL}/gettestcases`,{
            params: { problemId: problemId }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to get test cases');
    }
}

export const runCodeCpp = async (language,code,input) => {
    try {
        const response = await axios.post(`${API_URL}/run`, { language, code,input });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error while trying to run code');
    }
}