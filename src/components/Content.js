import React from 'react'
// import { Outlet } from 'react-router-dom'
import './Content.scss'
import List from './List'
import Form from './Form'
import { initAppForm } from '../constans'



function Content() {
    return (
        <>
            <div className="content-container container">
                <div className="row">

                    <div className="col-md-5 col-sm-12 col-12 hide-on-tablet">
                        <Form />
                    </div>
                    <div className="col-md-7 col-sm-12 col-12">
                        <List />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Content