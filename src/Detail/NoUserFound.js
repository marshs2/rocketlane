import React, { useEffect }from 'react';
import { useHistory } from "react-router-dom";
import noUser from '../assets/nouser.jpg';

import './NoUserFound.css';

export default function NoUserFound(props) {
    
    let history = useHistory();

    // Auto-redirect in 5s to Main page 
    useEffect(() => {
        setTimeout(() => {
            history.push(`/reps`);
        }, 5000)
    }, [history]);

    return (
        <div className="main no-user">
            <p className="error-text">If you weren't searching for me, Search again!!</p>
            <img src={noUser} alt="Skeleton with Coffee Cup"/>
        </div>
    )
}