import React from 'react';
import './RocketGrid.css';

import './BodyCell.css';

export default function BodyCell (props) {

    return (
        <React.Fragment>
            <tr onClick={(event) => props.onRowClick(event, props.row)}
                data-row={props.row['id']}
                className={props.row['id'] % 2 === 0 ? 'rocket-row even': 'rocket-row odd'}>
                {props.columns.map((column, i) => 
                    <td key={i}>
                        {props.row[column.name]}
                    </td>
                )}
            </tr>
        </React.Fragment>
    )
}