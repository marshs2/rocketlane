import React from 'react';
import './RocketGrid.css';

import './BodyCell.css';

export default function BodyCell (props) {

    return (
        <React.Fragment>
            {/*Only on Click of the rep name, the Detail page to be shown */}
            <tr className={props.row['id'] % 2 === 0 ? 'rocket-row even': 'rocket-row odd'}>
                {props.columns.map((column, i) => {
                        return column.name === 'rep'?
                        <td key={i} onClick={(event) => props.onRowClick(event, props.row)}
                            data-row={props.row['id']}>
                            {props.row[column.name]}
                        </td>:
                        <td key={i}>
                            {props.row[column.name]}
                        </td>
                    }
                )}
            </tr>
        </React.Fragment>
    )
}