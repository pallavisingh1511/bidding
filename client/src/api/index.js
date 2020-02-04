import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const placeBid = payload => api.post(`/auction`, payload)

const apis = {
    placeBid
}

export default apis
