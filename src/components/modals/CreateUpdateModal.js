import React from 'react'
import Form from '../Form'
import { FaTimes } from 'react-icons/fa'
import './CreateUpdateModal.scss'
function CreateUpdateModal({ setIsShowCUModal, action, setAction, setInputValue, initValueInput }) {
    return (
        <div className="create-update-modal show-on-tablet-modal">
            <div
                className="modal-content__cu container"
            >
                <div className="content-cu__header">
                    <h2 className="header-title">{action === 'UPDATE' ? 'Cập nhật thông tin' : 'Thêm mới'}</h2>
                    <FaTimes
                        className="header-icon"
                        onClick={() => {
                            setIsShowCUModal(false)
                            setAction('')
                            setInputValue(initValueInput)
                        }}
                    />
                </div>
                <div className="content-cu__body">
                    <Form />
                </div>

            </div>
        </div>
    )
}

export default CreateUpdateModal