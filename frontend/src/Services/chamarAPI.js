import axios from 'axios';

const chamarAPI = () => {

  const apiCall = axios.create({
    baseURL: 'http://localhost:3000',
  });

  return apiCall;
};

export default chamarAPI;
