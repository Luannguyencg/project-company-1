import axios from "../axios"

export const getStudents = (courseId, page, limit, searchText) => {
    return axios.get(`/api-get-students?courseId=${courseId}&page=${page}&limit=${limit}&searchText=${searchText}`)
}
export const createNewStudent = (formData, config) => {
    return axios.post('/api-create-new-student', formData, config)
}
export const updateStudent = (formData, config) => {
    return axios.post('/api-update-student', formData, config)
}
export const deleteStudent = (id) => {
    return axios.delete('/api-delete-student', {
        data: {
            id: id,
        }
    })
}