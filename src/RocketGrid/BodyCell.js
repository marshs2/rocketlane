import React from 'react';
import './RocketGrid.css';

import './BodyCell.css';

export default function BodyCell (props) {

    return (
        <React.Fragment>
            <tr className={props.row['id'] % 2 === 0 ? 'rocket-row even': 'rocket-row odd'}>
                {props.columns.map((column, i) => 
                    <td key={i}>
                        {props.row[column.name]}
                    </td>
                )}
            </tr>
        </React.Fragment>
    )
}