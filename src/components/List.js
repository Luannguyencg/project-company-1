import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import './List.scss'
import Pagination from './Pagination'
import { AppContext } from '../contexts/AppProvider'
import { upperCase } from '../utills'

function List() {
    const history = useNavigate();
    const { courses, setCourseId,
        courseId, pageTotal,
        pageNumber, setSearchText,
        setPageNumber, handlePaginate,
    } = useContext(AppContext)

    const [inputSearchValue, setInputSearchValue] = useState('')
    const params = useParams()


    const { courseIdParam } = params

    // console.log(courseId)
    const handleOnchangeSelect = (e) => {
        let courseId = e.target.value
        history(`/manage-student/${courseId}`);
        setPageNumber(1)
    }


    useEffect(() => {
        setCourseId(courseIdParam)

    }, [courseIdParam, setCourseId])

    const handleChangeSearchInput = (e) => {
        if (e.target.value) {
            setInputSearchValue(upperCase(e.target.value))
        } else (
            setInputSearchValue('')
        )


    }
    const handleSearch = () => {
        setSearchText(inputSearchValue)
    }

    return (
        <>

            <div className="list-container">
                <div className="list-header">
                    <h4 className="list-header__heading">
                        Danh sách học sinh
                    </h4>
                    <div className="list-header__search">
                        <div className="list-header__search-input">
                            <input
                                type="text"
                                value={inputSearchValue}
                                className="form-control input"
                                placeholder="Tìm kiếm học sinh"
                                onChange={handleChangeSearchInput}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        handleSearch()
                                    }
                                }}
                            />
                            <div
                                className="icon-box"
                                onClick={handleSearch}

                            >
                                <FaSearch className="search-icon" />
                            </div>
                        </div>
                        <div className="select-filter">
                            <select
                                className="form-select"
                                value={courseId}
                                name="search-select"
                                onChange={handleOnchangeSelect}
                            >
                                <option value="all">
                                    Tất cả
                                </option>
                                {courses && courses.length > 0 &&
                                    courses.map((item, index) => {
                                        return (
                                            <option
                                                value={item.courseId}
                                                key={index}
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </div>
                </div>
                <div className="list-content">

                    <div className="list-content__heading">
                        <span className="">
                            Họ và tên
                        </span>
                        <span className="">
                            Ngày sinh
                        </span>
                    </div>

                    <Outlet />


                </div>
                {pageTotal > 1 ?
                    <div className="list-footer">
                        <Pagination
                            pageTotal={pageTotal}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            handlePaginate={handlePaginate}
                            courseId={courseId}
                        />
                    </div> :
                    null

                }
            </div>
        </>
    )
}

export default List