import React, { useState, useEffect } from 'react';
import './RocketGrid.css';

import HeaderCell from './HeaderCell';
import BodyCell from './BodyCell';

export default function RocketGrid (props) {

    const [columns, setColumns] = useState(props.columns);
    const [sortMeta, setSortMeta] = useState(JSON.parse(localStorage.getItem('sort-meta')));
    const [typeMeta, setTypeMeta] = useState({});
    const [sortable, setSortable] = useState({});

     useEffect(() => {
        if (!sortMeta) {
            setSortMeta(() => {
                localStorage.setItem('sort-meta', JSON.stringify({}));
            });
        }

        if (props.columns.length) {
            props.columns.forEach((column) => {
                typeMeta[column['name']] = column['type'];
                sortable[column['name']] = column['sortable'];
            })
        }
    }, [props.columns, sortMeta, typeMeta, sortable]);

    const onSort = (event) => {
        const { attributes: { "data-column-name": {nodeValue} } } = event.target;

        if (!sortable[nodeValue]) return;
    
        let lsortMeta = {...sortMeta};
        let nextSort = '';

        if (!(nodeValue in lsortMeta)) {
            lsortMeta = {[nodeValue]: 'asc'}
        } else {
            switch (lsortMeta[nodeValue]) {
                case '': 
                    nextSort = 'asc';
                    break;
                case 'asc':
                    nextSort = 'desc'
                    break;
                case 'desc':
                    nextSort = ''
                    break;

                default:
                    break;
            }
            lsortMeta[nodeValue] = nextSort;
        }

        setSortMeta(() => {
            localStorage.setItem('sort-meta', JSON.stringify(lsortMeta));
            return lsortMeta;
        });
    }

    const onRowRefresh = () => {
        let rows = [...props.rows];

        let metaKeys = sortMeta ? Object.keys(sortMeta): {};

        if (rows.length && metaKeys.length) {
            // Current Sort Column is determined by this
            let key = metaKeys[0];

            if (sortMeta[key]) {
                if (typeMeta[key] === "string") {
                    rows.sort((a, b) => {
                        return sortMeta[key] === 'asc' ? 
                            a[key].localeCompare(b[key]):
                            b[key].localeCompare(a[key]);
                    })
                } else if (typeMeta[key] === "number") {
                    rows.sort((a, b) => {
                        return sortMeta[key] === 'asc' ?
                                parseFloat(a[key]) - parseFloat(b[key]):
                                parseFloat(b[key]) - parseFloat(a[key]);
                    });
                }
            }
        }

        return rows.map((row, i) => 
            <BodyCell key={i} row={row} columns={props.columns} sortMeta={sortMeta}/> )
        
    }

    return (
        <div className="grid">
            <table className="grid-table">
                <tr>
                    {props.columns.map((column, i) => 
                        <HeaderCell key={i} column={column} onSort={onSort} sortMeta={sortMeta}/>)}
                </tr>

                {onRowRefresh()}
            </table>
        </div>
    )
}