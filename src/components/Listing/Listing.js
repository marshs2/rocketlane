import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Listing.css';

import RocketGrid from '../RocketGrid/RocketGrid';

const Listing = () => {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    let history = useHistory();

    // Save the current row details in Session storage and navigate to Details page on Rep column Click
    const onRepClick = (event, row) => {
        const {"data-row": {nodeValue: id}} = event.currentTarget.attributes;
        sessionStorage.setItem('temp-row-detail', JSON.stringify(row));
        history.push(`/reps/${id}`);
    }

    const clickOptions = {
        'rep': onRepClick
    }

    useEffect(() => {
        (async () => {
            let { data } = await axios.get("/reps/list");
            setColumns(data['columns']);
            setRows(data['rows']);
        })();
    }, []);

    return (
        <>
            <div className="main">
                <div className="heading">
                    <div className="text">
                        <span>List View</span>
                    </div>
                </div>
                <RocketGrid
                    id="xyz"
                    columns={columns}
                    rows={rows}
                    onRepClick={onRepClick}
                    clickOptions={clickOptions}
                />
            </div>
        </>
    )
}

export default Listing;