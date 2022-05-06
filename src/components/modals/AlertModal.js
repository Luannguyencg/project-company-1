import React from 'react'
import { FcAcceptDatabase, FcHighPriority } from 'react-icons/fc'
// import { BiError } from 'react-icons/bi'
import './AlertModal.scss'
function AlertModal({ message, error }) {
    return (
        <div className="alert-container">
            <div className="alert-content">
                <div className="alert-icon">
                    {error ?
                        <FcHighPriority />
                        :
                        <FcAcceptDatabase />
                    }
                </div>
                <div className="alert-info-modal">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default AlertModal