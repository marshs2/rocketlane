import React from 'react';
// import './RocketGrid.css';
import './Grid.css';

import HeaderCell from './HeaderCell';

export default function Grid (props) {

    return (
        <div className="grid">
            <table className="grid-table">
                <tbody>
                    <tr>
                        {props.columns.map((column, i) => 
                            <HeaderCell key={i} column={column} onSort={props.onSort} sortMeta={props.sortMeta}/>)}
                    </tr>
                    {props.onRowRefresh()}
                </tbody>
            </table>
        </div>
    )
}