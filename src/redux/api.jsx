import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1";

export const loginUserApi = async (email, password) => {
  return axios.post(`${API_BASE_URL}/user/login`, { email, password });
};

export const signUpUserApi = async (email, password, firstName, lastName) => {
  return axios.post(`${API_BASE_URL}/user/signup`, { email, password, firstName, lastName });
};

export const fetchProfileApi = async (token) => {
  return axios.post(
    `${API_BASE_URL}/user/profile`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateProfileApi = async (token, firstName, lastName) => {
  return axios.put(
    `${API_BASE_URL}/user/profile`,
    { firstName, lastName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
