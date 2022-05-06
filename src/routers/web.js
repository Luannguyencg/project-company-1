import express from 'express';
import { getStudents, createNewStudent, updateStudent, deleteStudent, uploadAvata } from '../controllers/studentsController.js'
import { getAllCourses } from '../controllers/courseController.js'


const router = express.Router();
const initWebRouters = (app) => {

    router.get('/api-get-students', getStudents)
    router.post('/api-create-new-student', uploadAvata, createNewStudent)
    router.post('/api-update-student', uploadAvata, updateStudent)
    router.delete('/api-delete-student', deleteStudent)



    router.get('/api-get-all-courses', getAllCourses)


    return app.use('/', router)
}

export default initWebRouters