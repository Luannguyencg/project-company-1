import React, { useContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import './Student.scss'
import { AppContext } from '../contexts/AppProvider'
import ActionModal from './modals/ActionModal'
function Student() {
    const { listStudent, setInputValue,
        setAction, action, isShowModal,
        setIsShowModal, handleSubmit,
        setIsShowCUModal
    } = useContext(AppContext)
    const [itemDelete, setItemDelete] = useState({})

    const handleEditData = (data) => {
        setInputValue(data)
        setAction('UPDATE')
        setIsShowCUModal(true)
    }
    const handleDeleteData = (data) => {
        setItemDelete(data)
        setAction('DELETE')
        setIsShowModal(true)
    }

    return (
        <>
            <ActionModal
                isShowModal={isShowModal}
                itemDelete={itemDelete}
                setIsShowModal={setIsShowModal}
                handleSubmit={handleSubmit}
                setAction={setAction}
                action={action}
            />

            {listStudent && listStudent.length > 0 &&
                listStudent.map((item, index) => {
                    return (
                        <div className="item-container" key={item._id}>
                            <div className="item-content">
                                <span className="">
                                    <span className="numb-oder">{`${index + 1}. `}</span>
                                    {`${item.firstName} ${item.lastName}`}
                                </span>
                                <span className="">
                                    {item.birthDate}
                                </span>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic" size="sm">

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        className="text-center"
                                        onClick={() => handleEditData(item)}
                                    >Sửa</Dropdown.Item>
                                    <Dropdown.Item
                                        className="text-center"
                                        onClick={() => handleDeleteData(item)}
                                    >Xóa</Dropdown.Item>
                                    <Dropdown.Item className="text-center">Chi tiết</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    )
                })
            }

        </>
    )
}

export default Student