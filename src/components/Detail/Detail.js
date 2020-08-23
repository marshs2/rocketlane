import React, { useState, useEffect } from 'react';
import './Detail.css';
import {
  useParams,
  Link
} from "react-router-dom";
import axios from 'axios';

import './Detail.css';
import placeholder from '../../assets/placeholder.png';
import NoUserFound from './NoUserFound';

const Detail = (props) => {
    const [rowDetail, setRowDetail] = useState({});
    const [noUserFound, setNoUserFound] = useState(false);
    const [userAvailable, setUserAvailable] = useState(false);
    let { rep_id } = useParams();

    // If User came from Listing page, show that Data, else, get from Users API (User API has more details eg. Addr)
    useEffect(() => {
        let row = sessionStorage.getItem('temp-row-detail');
        if (row) {
            sessionStorage.removeItem('temp-row-detail');
            setRowDetail(JSON.parse(row));
            setUserAvailable(true);
        } else {
            (async () => {
                const { data } = await axios.get("/reps/users");
                let rowList = data.filter((row) => {
                    return parseInt(row['id']) === parseInt(rep_id);
                });
                // If User is not available in both cases, mark as NoUserFound
                if (rowList.length) {
                    setRowDetail(rowList[0]);
                    setUserAvailable(true);
                } else {
                    setNoUserFound(true);
                }
            })();
        };
    }, [rep_id]);

    return (
        <>
            {userAvailable &&
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
                                    {/*Dummy Photo Image viwer*/}
                                    {rowDetail.id &&
                                        <img src={`https://randomuser.me/api/portraits/men/${rowDetail.id}.jpg`}
                                             alt="Representative's face"
                                             className="rep-img"/>
                                    }
                                </div>
                                <div className="details">
                                    <div className="name-field">{rowDetail.rep}</div><br/>
                                    {Object.keys(rowDetail).length?
                                        <>
                                            <div>Region: {rowDetail.region}</div><br/>
                                            {rowDetail.address &&
                                            <>
                                                <div>Address: {rowDetail.address}</div>
                                                <div>Street: {rowDetail.street}</div>
                                                <div>City: {rowDetail.city}</div>
                                                <div>Country: {rowDetail.country}</div>
                                            </>
                                            }
                                        </>: null
                                    }
                                </div>
                            </div>
                        </article>
                        <article className="side-content detail">
                            <img className="placeholder-img" src={placeholder} alt="Placeholder - No content"/>
                        </article>
                    </section>
                </div>
            </div>}
            {noUserFound &&
                <NoUserFound />
            }
        </>
    )
}

export default Detail;