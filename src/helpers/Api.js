import axios from "axios";

let baseUrl = "http://localhost";

const $api = axios.create({
  withCredentials: true,
  baseURL: baseUrl
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  if (config.port) {
    config.baseURL = `${baseUrl}:${config.port}`;
    delete config.port; // Удаляем, чтобы не мешал
  }

  return config;
})

$api.interceptors.response.use((config) => {
  return config;
},async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.post(`${baseUrl}:8000/refreshToken`, {}, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН' + e);
      window.em.send('not_auth', {})
    }
  }
  throw error;
})

export default class Api {

  static async get(endPoint, port = 8000){
    //return await axios.get('http://localhost:8000/api/getChats?user_id=1&filters={%22search%22:%22%22}');

    return await $api.get(endPoint, {
      port: port
    });

  }

  static async post(endPoint, data, port = 8000){
    //return await axios.get('http://localhost:8000/api/getChats?user_id=1&filters={%22search%22:%22%22}');

    return await $api.post(endPoint, data,{
      port: port
    });

  }
}
