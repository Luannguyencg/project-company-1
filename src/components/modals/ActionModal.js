import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './ActionModal.scss'

function ActionModal({ isShowModal, setIsShowModal, itemDelete, handleSubmit, setAction, action }) {
    // console.log(itemDelete._id)
    return (
        <>
            {isShowModal ?

                <div className="modal-container">
                    <div
                        // style={Object.assign({}, isShowModal && styles.showModal)}
                        className={`modal-content ${isShowModal && 'show-modal'}`}
                    >
                        <div className="modal-content__header">
                            <h2 className="header-title">{`${itemDelete.firstName} ${itemDelete.lastName}`}</h2>
                            <FaTimes
                                className="header-icon"
                                onClick={() => {
                                    setIsShowModal(false)
                                    setAction('')
                                }}
                            />
                        </div>
                        <div className="modal-content__body">{`Bạn có chắc muốn xóa dữ dữ liệu của: ${itemDelete.firstName} ${itemDelete.lastName}`}</div>
                        <div className="modal-content__footer">
                            <button
                                type="button"
                                className="btn btn-close-modal bg-danger"
                                onClick={() => {
                                    setIsShowModal(false)
                                    setAction('')
                                }}
                            >Close</button>
                            <button
                                type="button"
                                className="btn btn-complete"
                                onClick={() => {
                                    handleSubmit(itemDelete, action)
                                }}
                            >Complete</button>
                        </div>
                    </div>

                </div>
                : undefined
            }


        </>
    )
}

export default ActionModal