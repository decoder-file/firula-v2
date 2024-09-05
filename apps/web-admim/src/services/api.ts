import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://firula-backend.onrender.com',
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await api.post('token/refresh', {
          refreshToken,
        })
        const { token } = response.data

        localStorage.setItem('token', token)

        originalRequest.headers.Authorization = `Bearer ${token}`
        return axios(originalRequest)
      } catch (error) {
        localStorage.setItem('token', '')
        localStorage.setItem('refreshToken', '')
      }
    }

    // Extrair a mensagem de erro do backend
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message
      const statusCode = error.response.status
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ message: errorMessage, statusCode })
    }

    return Promise.reject(error)
  },
)

export default api
