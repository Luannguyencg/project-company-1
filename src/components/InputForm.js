import React from 'react'
import noPhoto from '../assets/image/no_avata.png'


function InputForm({
    inputValue,
    initAppForm,
    isShowFormAvata,
    isShowFormSelect,
    handleImage,
    handleOnchangeInput,
    courses,
    previewAvata,
    formError,
    urlBE,
    action }) {

    return (
        <>
            {isShowFormAvata &&
                <div className="col-12 text-center">
                    <label htmlFor="avata" className="title-input">
                        {action === 'UPDATE' ?
                            !previewAvata ?
                                <div
                                    className={inputValue.avata ? "preview-avata hasAvata" : "preview-avata"}
                                    style={inputValue.avata ? { backgroundImage: `url(${urlBE}/${inputValue.avata})` } : { backgroundImage: `url(${noPhoto})` }}
                                >
                                </div>
                                :
                                <div
                                    className={previewAvata ? "preview-avata hasAvata" : "preview-avata"}
                                    style={previewAvata ? { backgroundImage: `url(${previewAvata.preview})` } : { backgroundImage: `url(${noPhoto})` }}
                                >
                                </div>
                            :
                            <div
                                className={previewAvata ? "preview-avata hasAvata" : "preview-avata"}
                                style={previewAvata ? { backgroundImage: `url(${previewAvata.preview})` } : { backgroundImage: `url(${noPhoto})` }}
                            >
                            </div>
                        }

                        Chọn hình avata
                    </label>

                    <input
                        id="avata"
                        type="file"
                        className="form-control input-image"
                        placeholder="Enter email"
                        name="image"
                        onChange={handleImage}
                    />

                </div>
            }
            {initAppForm && initAppForm.length > 0 &&
                initAppForm.map((item, index) => {

                    return (
                        <div className="col-12" key={index}>
                            <label className="title-input">{item.label}</label>
                            <input
                                type={item.type}
                                className="form-control"
                                placeholder={item.placeholder}
                                name={item.name}
                                value={inputValue[item.name]}
                                onChange={handleOnchangeInput}
                            />
                            <p className="text-danger">{formError[item.name]}</p>
                        </div>
                    )
                })
            }

            {/* <div className="col-12">
                <label className="title-input">Họ</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập họ của bạn"
                    name="firstName"
                    value={inputValue.firstName}
                    onChange={handleOnchangeInput}
                />
                <p className="text-danger">{formError.firstName}</p>
            </div>
            <div className="col-12">
                <label className="title-input">Tên</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên của bạn (cả tên đệm nếu có)"
                    name="lastName"
                    value={inputValue.lastName}
                    onChange={handleOnchangeInput}
                />
                <p className="text-danger">{formError.lastName}</p>
            </div>
            <div className="col-12">
                <label className="title-input">Ngày sinh</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ngày / tháng / năm ..."
                    name="birthDate"
                    value={inputValue.birthDate}
                    onChange={handleOnchangeInput}
                />
                <p className="text-danger">{formError.birthDate}</p>
            </div>
            <div className="col-12">
                <label className="title-input">Số điện thoại</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    value={inputValue.phoneNumber}
                    onChange={handleOnchangeInput}
                />
                <p className="text-danger">{formError.phoneNumber}</p>
            </div> */}
            {isShowFormSelect &&
                <div className="col-12">
                    <label className="title-input">Chọn Khóa học</label>
                    <select
                        className="form-select"
                        id="inputGroupSelect01"
                        name="courseId"
                        onChange={handleOnchangeInput}
                        value={inputValue.courseId}
                    >
                        <option value='' disabled>Choose...</option>
                        {courses && courses.length > 0 &&
                            courses.map(item => {
                                return (
                                    <option value={item.courseId} key={item._id}>{item.name}</option>
                                )

                            })

                        }
                    </select>
                    <p className="text-danger">{formError.courseId}</p>
                </div>
            }
        </>
    )
}

export default InputForm