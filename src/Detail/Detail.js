import React, { useState, useEffect } from 'react';
import './Detail.css';
import {
  useParams,
  Link
} from "react-router-dom";

import './Detail.css';
import placeholder from '../assets/placeholder.png';

export default function Detail (props) {
    const [rowDetail, setRowDetail] = useState({});
    let { rep_id } = useParams();

    useEffect(() => {
        let row = sessionStorage.getItem('temp-row-detail');
        if (row) {
            sessionStorage.removeItem('temp-row-detail');
            setRowDetail(JSON.parse(row));
        } else {
            fetch("/reps/users")
            .then((res) => res.json())
            .then((json) => {
                let rowList = json.filter((row) => {
                    return parseInt(row['id']) === parseInt(rep_id);
                });
                if (rowList.length) setRowDetail(rowList[0]);
            })
        };
    }, [rep_id]);

    return (
        <React.Fragment>
            <div className="main">
                <div className="heading">
                    <div className="text">
                        <span>
                            <Link className="list-page" to="/reps">List</Link> / {rowDetail.rep}
                            </span>
                    </div>
                </div>
                <div>
                    <section className="layout">
                        <article className="main-content detail">
                            <div className="detail-main">
                                <div className="image-holder ">
                                    {rowDetail.id &&
                                        <img src={`https://randomuser.me/api/portraits/men/${rowDetail.id}.jpg`}
                                             alt="Representative's face"
                                             className="rep-img"/>
                                    }
                                </div>
                                <div className="details">
                                    <div className="name-field">{rowDetail.rep}</div><br/>
                                    {Object.keys(rowDetail).length?
                                        <React.Fragment>
                                            <div>Region: {rowDetail.region}</div><br/>
                                            {rowDetail.address &&
                                            <React.Fragment>
                                                <div>Address: {rowDetail.address}</div>
                                                <div>Street: {rowDetail.street}</div>
                                                <div>City: {rowDetail.city}</div>
                                                <div>Country: {rowDetail.country}</div>
                                            </React.Fragment>
                                            }
                                        </React.Fragment>: null
                                    }
                                </div>
                            </div>
                        </article>
                        <article className="side-content detail">
                            <img className="placeholder-img" src={placeholder} alt="Placeholder - No content"/>
                        </article>
                    </section>
                </div>
            </div>
        </React.Fragment>
    )
}