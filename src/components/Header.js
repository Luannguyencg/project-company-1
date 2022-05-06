import React, { useContext } from 'react'
import './Header.scss'
import CreateUpdateModal from './modals/CreateUpdateModal'
import { AppContext } from '../contexts/AppProvider'

function Header() {
    const { isShowCUModal, setIsShowCUModal, setAction, setInputValue, initValueInput } = useContext(AppContext)
    return (
        <>

            <div className="header-container container">
                <h1 className="header-heading">Quản lý học sinh</h1>
                <button
                    className="btn header-btn show-on-tablet-btn"
                    onClick={() => setIsShowCUModal(true)}
                >Thêm mới</button>
                {isShowCUModal &&
                    <CreateUpdateModal
                        setIsShowCUModal={setIsShowCUModal}
                        setAction={setAction}
                        setInputValue={setInputValue}
                        initValueInput={initValueInput}
                    />
                }
            </div>
        </>
    )
}

export default Header