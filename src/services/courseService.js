import axios from "../axios"

export const getAllCourse = () => {
    return axios.get('/api-get-all-courses')
}
