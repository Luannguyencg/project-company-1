import { ModelCourse } from "../models/courseModel.js";

export const getAllCourseService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ModelCourse.find()
            resolve({
                errCode: 0,
                data
            })
        }
        catch (e) {
            reject(e);
        }
    })
}