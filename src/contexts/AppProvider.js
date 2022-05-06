import React, { useState, useEffect, createContext } from 'react'
import { getAllCourse } from '../services/courseService'
import { createNewStudent, getStudents, updateStudent, deleteStudent } from '../services/studentService'
import { validateForm } from '../utills'
import { LIMIT } from '../constans'
import { useSearchParams } from 'react-router-dom'


export const AppContext = createContext()

function AppProvider({ children }) {
    const initValueInput = {
        email: "",
        avata: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        courseId: "",
    }






    const [isShowModal, setIsShowModal] = useState(false)
    const [inputValue, setInputValue] = useState(initValueInput)
    const [previewAvata, setPreviewAvata] = useState('')
    const [updateValue, setUpdateVlue] = useState({})
    const [action, setAction] = useState('')
    const [courses, setCourses] = useState([])
    const [listStudent, setListStudent] = useState([])
    const [courseId, setCourseId] = useState('all')
    const [formError, setFormError] = useState({})
    const [pageTotal, setPageTotal] = useState()

    const [pageNumber, setPageNumber] = useState(1)
    const [searchText, setSearchText] = useState("")

    //
    const [isShowCUModal, setIsShowCUModal] = useState(false)
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [message, setMessage] = useState('')

    const [error, setError] = useState(false)

    let [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page")
    const keyword = searchParams.get("keyword")


    useEffect(() => {
        if (isShowAlert == true) {
            setTimeout(() => {
                setIsShowAlert(false)
                setMessage('')
                setError(false)
            }, 1000)
        }
    }, [isShowAlert, message, error])

    useEffect(() => {
        if (page) {
            setPageNumber(page)
        }
    }, [page])

    useEffect(() => {
        if (searchText) {
            setSearchParams({
                page: pageNumber,
                keyword: searchText,
            })
        } else {
            setSearchParams({
                page: pageNumber,
            })
        }

    }, [searchText, setSearchText, courseId, pageNumber])
    useEffect(() => {

        if (keyword && keyword !== 'undefined') {
            setSearchText(keyword)
        }

    }, [keyword])



    useEffect(() => {

        if (!searchText) {
            // console.log("No search text:", searchText)
            getStudents(courseId, pageNumber, LIMIT)
                .then((response) => {
                    setListStudent(response.data.results)
                    setPageTotal(response.data.currentPage)
                    // console.log(response.data.currentPage)

                })
                .catch(e => console.log(e))

        } else if (searchText && searchText !== 'undefined') {
            console.log("has search text", searchText)

            getStudents(courseId, pageNumber, LIMIT, searchText)
                .then((response) => {
                    setListStudent(response.data.results)
                    setPageTotal(response.data.currentPage)
                    // console.log(response.data.currentPage)
                })
                .catch(e => console.log(e))

        }
    }, [courseId, pageNumber, keyword, page, action, isShowAlert]);

    useEffect(() => {
        getAllCourse()
            .then((res) => {
                if (res.errCode === 0) {

                    setCourses(res.data)
                }

            })
            .catch(err => console.log(err))
    }, [])
    const checkValidateInput = () => {
        let isValid
        setFormError(validateForm(inputValue))
        if (Object.keys(validateForm(inputValue)).length === 0) {
            isValid = true

        } else {
            isValid = false
        }
        return isValid
    }

    const handleSubmit = (data, action) => {
        if (action === 'DELETE') {
            // console.log(data._id)
            deleteStudent(data._id)
                .then((res) => {
                    if (res && res.errCode === 0) {
                        setIsShowAlert(true)
                        setAction('')
                        setIsShowModal(false)
                        setMessage(`Đã Xóa thành công !`)
                    }
                })
                .catch((err) => {
                    setMessage(`Xóa không thành công !`)
                    console.log(err)
                })
            return;
        }
        let isValid = checkValidateInput()

        if (action === 'UPDATE' && isValid) {

            const formData = new FormData();

            formData.append('avata', data.avata)
            formData.append('email', data.email)
            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('birthDate', data.birthDate)
            formData.append('phoneNumber', data.phoneNumber)
            formData.append('courseId', data.courseId)
            formData.append('updatedAt', new Date())



            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            updateStudent(formData, config)
                .then((res) => {
                    if (res && res.errCode === 0) {
                        setInputValue(initValueInput)
                        setAction('')
                        setPreviewAvata('')
                        setIsShowCUModal(false)
                        setIsShowAlert(true)
                        setMessage(`Cập nhật thành công !`)
                    }
                })
                .catch((err) => {
                    setMessage(`Cập nhật thất bại !`)
                    setIsShowAlert(true)
                    setError(true)
                    console.log(err)
                })

            return;
        }

        if (isValid && !action || action === 'CREATE') {
            const formData = new FormData();

            formData.append('avata', data.avata)
            formData.append('email', data.email)
            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('birthDate', data.birthDate)
            formData.append('phoneNumber', data.phoneNumber)
            formData.append('courseId', data.courseId)



            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            createNewStudent(formData, config)
                .then((res) => {
                    if (res && res.errCode === 0) {
                        setIsShowAlert(true)
                        setIsShowCUModal(false)
                        setInputValue(initValueInput)
                        setMessage(`Thêm mới thành công!`)
                        setPreviewAvata('')
                    }
                    if (res && res.errCode === 2) {
                        setIsShowAlert(true)
                        setMessage(`Email của đã tồn tại!`)
                        setError(true)
                    }
                })
                .catch((e) => {
                    setIsShowAlert(true)
                    setError(true)
                    setMessage(`Thêm mới thất bại !`)
                    console.log(e)
                })
            if (!action) {
                setAction('CREATE')
                return;
            }
            if (action === 'CREATE') {
                setAction('')
                return;
            }
        }
        // console.log(data)
    }




    return (
        <AppContext.Provider value={{
            initValueInput,
            inputValue, setInputValue,
            listStudent, setListStudent,
            updateValue, setUpdateVlue,
            courses, setCourses,
            previewAvata, setPreviewAvata,
            formError, setFormError,
            handleSubmit, pageTotal, setPageTotal,
            pageNumber, setPageNumber,
            setCourseId, courseId,
            searchText, setSearchText,
            searchParams, setSearchParams,
            action, setAction,
            isShowModal, setIsShowModal,
            isShowCUModal, setIsShowCUModal,
            isShowAlert, setIsShowAlert,
            message, setMessage,
            error
        }}>

            {children}
        </AppContext.Provider>
    )
}

export default AppProvider