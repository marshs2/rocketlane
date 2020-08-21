import React from 'react';
import './RocketGrid.css';

import './BodyCell.css';

const BodyCell = ({row, columns, onRowClick, clickOptions}) =>  {

    const addAlternateClass = (row) => {
        if (row['id'] % 2 === 0) {
            return 'rocket-row-even';
        }
        return 'rocket-row-odd';
    }

    return (
        <React.Fragment>
            {/*Only on Click of the rep name, the Detail page to be shown */}
            <tr className={`rocket-row ${addAlternateClass(row)}`}>
                {columns.map((column, i) => {
                        const conditionalParams = {};
                        if (clickOptions &&
                            column.name in clickOptions &&
                            typeof clickOptions[column.name] === 'function') {
                            conditionalParams['onClick'] = (event) => clickOptions[column.name](event, row);
                            conditionalParams['data-row'] = row['id'];
                        }
                        return (
                            <td key={i} {...conditionalParams}>
                                {row[column.name]}
                            </td>
                        )
                    }
                )}
            </tr>
        </React.Fragment>
    )
}

export default BodyCell;