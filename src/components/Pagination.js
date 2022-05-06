import React, { useEffect, useContext, useState } from 'react'
// import { AppContext } from '../contexts/AppProvider'

import './Pagination.scss'

function Pagination(props) {

    let { pageTotal, pageNumber, setPageNumber, courseId } = props
    let page = parseInt(pageNumber)
    // const { searchParams, setSearchParams } = useContext(AppContext)
    const [pagePagination, setPagePagination] = useState(1)


    // const page = searchParams.get("page");
    // const keyword = searchParams.get("keyword");
    useEffect(() => {
        setPageNumber(pagePagination)
    }, [pagePagination])

    let beforePages = page - 1;
    let afterPages = page + 1;
    let listpageMid = []


    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {

        if (pageLength > pageTotal) {
            continue;
        }
        if (pageLength == 0) {
            pageLength = pageLength + 1
        }
        listpageMid.push(pageLength)
    }



    if (page == pageTotal) {
        beforePages = beforePages - 2
    } else if (page == pageTotal - 1) {
        beforePages = beforePages - 1
    }
    /// how many pages or show after the current li
    if (page == 1) {
        afterPages = afterPages + 2
    } else if (page == 2) {
        afterPages = afterPages + 1
    }
    // console.log(listpageMid)

    const handlePrevPage = () => {
        setPagePagination((prev) => {
            return prev - 1
        })
    }
    const handleNextPage = () => {
        setPagePagination((prev) => {
            return prev + 1
        })
    }

    return (
        <ul className="pagination-list">
            {page > 1 ?
                <li
                    className="btn btn-pagination prev"
                    onClick={handlePrevPage}
                >Prev</li>
                :
                null
            }
            {page > 2 &&
                <li
                    className="numb"

                    onClick={() => setPagePagination(1)}
                >
                    <span>1</span>
                </li>
            }
            {page > 3 &&
                <li className='dots'>
                    <span>...</span>
                </li>
            }

            {listpageMid && listpageMid.length > 0 &&
                listpageMid.map((item, index) => {

                    return (

                        <li
                            key={index}
                            className={page == item ? "numb active" : "numb"}
                            onClick={() => setPagePagination(item)}
                        >
                            <span>{item}</span>
                        </li>
                    )
                })
            }
            {page < pageTotal - 2 &&
                <li className='dots'>
                    <span>...</span>
                </li>
            }

            {page < pageTotal - 1 &&
                <li
                    className="numb"
                    onClick={() => setPagePagination(pageTotal)}
                >
                    <span>{pageTotal}</span>
                </li>
            }
            {page < pageTotal ?
                <li
                    className="btn btn-pagination next"
                    onClick={handleNextPage}
                >Next</li>
                : null
            }
        </ul>
    )
}

export default Pagination