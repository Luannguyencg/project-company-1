import multer from 'multer';
import { getStudentService, createNewStudentService, deleteStudentService, updatStudentService } from '../services/studentService.js'

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');

    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1]
        callback(null, `image-${Date.now()}.${ext}`)
    }
})
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only image is Alowed ...!'))
    }
}
const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
})
export const uploadAvata = upload.single('avata')
//////

export const getStudents = async (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const courseId = req.query.courseId
    const searchText = req.query.searchText
    try {
        // console.log('check text search controller:', searchText)
        const response = await getStudentService(courseId, page, limit, searchText)

        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "Error from server"
        })
    }
}


export const createNewStudent = async (req, res) => {
    console.log('check info : ', req.body)
    const file = req.file
    const data = req.body
    // return;
    try {
        const response = await createNewStudentService(file, data)

        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "Error from server"
        })
    }
}
export const updateStudent = async (req, res) => {
    const file = req.file
    const data = req.body
    try {
        const response = await updatStudentService(file, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "Error from server"
        })
    }
}
export const deleteStudent = async (req, res) => {
    const id = req.body.id
    try {
        if (id) {
            const data = await deleteStudentService(id)
            return res.status(200).json(data)
        }

    } catch (e) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "Error from server"
        })
    }
}


