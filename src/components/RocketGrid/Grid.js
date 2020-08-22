import React from 'react';

import './Grid.css';

import HeaderCell from './HeaderCell';

const Grid = ({onRowRefresh, columns, onSort, sortMeta}) => {

    return (
        <div className="grid">
            <table className="grid-table">
                <tbody>
                    <tr>
                        {columns.map((column, i) => 
                            <HeaderCell key={i} column={column} onSort={onSort} sortMeta={sortMeta}/>)}
                    </tr>
                    {onRowRefresh()}
                </tbody>
            </table>
        </div>
    )
}

export default Grid;