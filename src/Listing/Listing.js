import React, { useState, useEffect } from 'react';
import './Listing.css';

import SideBar from '../SideBar/SideBar';
import RocketGrid from '../RocketGrid/RocketGrid';

export default function Listing (props) {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [isFilterOpen, setToggleFilter] = useState(false);

    const onFilter = () => {
        setToggleFilter(!isFilterOpen);
    }

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
                    <div className="filter">
                        <a className="filter-button" onClick={onFilter}>Filter</a>
                    </div>
                </div>
                <section>
                    <article className="grid">
                        {columns.length >= 0 && <RocketGrid columns={columns} rows={rows}/>}
                    </article>
                    <article className={`filter ${(isFilterOpen? 'show': 'hide')}`}>
                        Filter
                    </article>
                </section>
            </div>
        </React.Fragment>
    )
}