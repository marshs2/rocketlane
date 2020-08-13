import React, { useState, useEffect } from 'react';
import './Listing.css';

import SideBar from '../SideBar/SideBar';
import RocketGrid from '../RocketGrid/RocketGrid';

export default function Listing (props) {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("/reps/list")
        .then((res) => res.json())
        .then((json) => {
            setColumns(json['columns']);
            setRows(json['rows']);
        })
    }, []);

    return (
        <React.Fragment>
            {/*SideBar*/}
            <SideBar />

            <div className="main">
                <div className="heading">
                    <div className="text">
                        <span>List View</span>
                    </div>
                </div>
                <RocketGrid columns={columns} rows={rows}/>
            </div>
        </React.Fragment>
    )
}