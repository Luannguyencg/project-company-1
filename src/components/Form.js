import React, { useContext } from 'react'
import './Form.scss'
import { AppContext } from '../contexts/AppProvider'
import { CommonUtils, upperCase } from '../utills'
import { initAppForm } from '../constans'
import InputForm from './InputForm'
function Form() {

    const urlBE = process.env.REACT_APP_BACKEND_URL

    const { courses, inputValue,
        setInputValue, previewAvata,
        setPreviewAvata, formError, setFormError,
        handleSubmit, action } = useContext(AppContext)



    const handleImage = async (e) => {
        if (e.target.files) {
            let updateValueInput = { ...inputValue }
            let file = e.target.files[0]
            if (file) {
                file.preview = URL.createObjectURL(file)
                setPreviewAvata(file)
                // let base64 = await CommonUtils.getBase64(file);
                setInputValue({ ...updateValueInput, avata: file })

            }


        }
    }

    const handleOnchangeInput = (e) => {
        let updateValueInput = { ...inputValue }
        let coppyFormError = { ...formError }
        updateValueInput[e.target.name] = e.target.value
        coppyFormError[e.target.name] = ''
        setInputValue(updateValueInput)
        setFormError(coppyFormError)

    }
    // console.log(inputValue)
    return (
        <>
            <div className="form-container">
                <div className="row">
                    <InputForm
                        inputValue={inputValue}
                        initAppForm={initAppForm}
                        isShowFormAvata={true}
                        isShowFormSelect={true}
                        handleImage={handleImage}
                        handleOnchangeInput={handleOnchangeInput}
                        courses={courses}
                        previewAvata={previewAvata}
                        formError={formError}
                        urlBE={urlBE}
                        action={action}
                    />
                    <div className="col-12 d-flex">
                        <button
                            className="btn btn-app"
                            onClick={() => {
                                if (inputValue.firstName && inputValue.lastName) {
                                    handleSubmit({
                                        ...inputValue,
                                        firstName: upperCase("" + inputValue.firstName.trim() + ""),
                                        lastName: upperCase("" + inputValue.lastName.trim() + "")
                                    }, action)
                                } else {
                                    handleSubmit(inputValue, action)
                                }


                            }}
                        >
                            {action === 'UPDATE' ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                    </div>

                </div>
            </div >
        </>
    )
}

export default Form