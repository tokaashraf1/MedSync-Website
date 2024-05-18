
import { useState } from "react";
import axios from "axios";
import API_ENDPOINT from "../utils/constants";

const UseApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postRequest = async (url, requestData, token = null) => {
    setLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await axios.post(`${API_ENDPOINT}${url}`, requestData, { headers });
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const getRequest = async (url, token = null) => {
    setLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await axios.get(`${API_ENDPOINT}${url}`, { headers });
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const putRequest = async (url, requestData, token = null) => {
    setLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await axios.put(`${API_ENDPOINT}${url}`, requestData, { headers });
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return { loading, error, data, postRequest, getRequest, putRequest };
};


export default UseApi