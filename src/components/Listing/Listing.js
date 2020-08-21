import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Listing.css';

import RocketGrid from '../RocketGrid/RocketGrid';

const Listing = (props) => {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    let history = useHistory();

    // Save the current row details in Session storage and navigate to Details page on Rep column Click
    const onRowClick = (event, row) => {
        const {"data-row": {nodeValue: id}} = event.currentTarget.attributes;
        sessionStorage.setItem('temp-row-detail', JSON.stringify(row));
        history.push(`/reps/${id}`);
    }

    const clickOptions = {
        'rep': onRowClick
    }

    useEffect(() => {
        (async () => {
            let { data } = await axios.get("/reps/list");
            setColumns(data['columns']);
            setRows(data['rows']);
        })();
    }, []);

    return (
        <React.Fragment>
            <div className="main">
                <div className="heading">
                    <div className="text">
                        <span>List View</span>
                    </div>
                </div>
                <RocketGrid columns={columns} rows={rows} onRowClick={onRowClick} clickOptions={clickOptions} />
            </div>
        </React.Fragment>
    )
}

export default Listing;