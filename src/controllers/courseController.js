import { getAllCourseService } from '../services/courseService.js'

export const getAllCourses = async (req, res) => {
    try {
        const response = await getAllCourseService()

        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
    }
}