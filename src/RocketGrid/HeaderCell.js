import React from 'react';
import './RocketGrid.css';
import './HeaderCell.css';

export default function HeaderCell (props) {

    const isSortable = () => {
        return props.column.sortable;
    }

    const getIcon = () => {
        return props.sortMeta[props.column.name] === 'asc' ? 'fa-angle-up': 'fa-angle-down';
    }

    return (
        <th data-column={props.column.id} data-column-name={props.column.name} onClick={props.onSort}
            className={`header-cell ${(isSortable() ? 'sortable': null)}`}>
            <span data-column-name={props.column.name}>
                    {props.column.displayName}
                    {props.sortMeta[props.column.name] &&
                        <i data-column-name={props.column.name}
                            className={`fa ${getIcon()}`}></i>
                    }
            </span>
        </th>
    )
}