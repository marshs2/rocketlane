import React, { useState, useEffect } from 'react';
import './RocketGrid.css';

import Grid from './Grid';
import Filter from './Filter';
import BodyCell from './BodyCell';
import { FilterModel } from '../api/Model';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Errors }  from '../api/Errors';

export default function RocketGrid (props) {
    const [isFilterOpen, setToggleFilter] = useState(false);
    const [sortMeta, setSortMeta] = useState({});
    const [typeMeta] = useState({});
    const [sortable] = useState({});
    const [filterMeta, setFilterMeta] = useState({});
    const [filterCount, setFilterCount] = useState(0);
    const [totalFilterCount, setTotalFilterCount] = useState(0);

     useEffect(() => {
        if (props.columns.length) {
            props.columns.forEach((column) => {
                typeMeta[column['name']] = column['type'];
                sortable[column['name']] = column['sortable'];
            })
        }

    }, [props.columns, typeMeta, sortable]);

    useEffect(() => {
        if (filterMeta) {
            let filterCount = 0, totalFilterCount = 0;
            Object.keys(filterMeta).forEach(group => {
                Object.keys(filterMeta[group]).forEach((list) => {
                    totalFilterCount++;
                    if (filterMeta[group][list]) {
                        filterCount++;
                    }
                })
            });
            setFilterCount(() => filterCount);
            setTotalFilterCount(() => totalFilterCount);
        }   
    }, [filterMeta]);

    useEffect(() => {
        let sortMeta = localStorage.getItem('sort-meta'),
            filterMeta = localStorage.getItem('filter-meta'),
            isFilterOpen = localStorage.getItem('isFilterOpen');
        if (sortMeta) setSortMeta(JSON.parse(sortMeta));
        if (isFilterOpen) setToggleFilter(JSON.parse(isFilterOpen));
        if (filterMeta) {
            setFilterMeta(JSON.parse(filterMeta))
        } else {
            // Get the default filter meta list if not available in LocalStorage alreadty
            setFilterMeta(FilterModel())
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('sort-meta', JSON.stringify(sortMeta));
        localStorage.setItem('filter-meta', JSON.stringify(filterMeta));
        localStorage.setItem('isFilterOpen', JSON.stringify(isFilterOpen));
    }, [sortMeta, filterMeta, isFilterOpen]);

    const onSort = (event) => {
        const { attributes: { "data-column-name": {nodeValue} } } = event.target;

        if (!sortable[nodeValue]) {
            toast.dark(`"${nodeValue[0].toUpperCase()+nodeValue.slice(1)}" ${Errors['notSortable']}`, {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    
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

        let sortMetaKeys = sortMeta ? Object.keys(sortMeta): {};
        let filterMetaKeys = filterMeta ? Object.keys(filterMeta): {};

        if (rows.length && sortMetaKeys.length) {
            // Current Sort Column is determined by this
            let key = sortMetaKeys[0];

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

        return rows
            .filter(row => {
                if (filterMetaKeys.length) {
                    for (let i = 0; i < filterMetaKeys.length; i++) {
                        if (filterMeta[filterMetaKeys[i]][row[filterMetaKeys[i]]]) {
                            return true;
                        }
                    }
                    return false;
                }
    
                return true;
            })
            .map((row, i) => 
                <BodyCell key={i} row={row} columns={props.columns} sortMeta={sortMeta}/> )
    }

    const onFilter = () => {
        setToggleFilter(!isFilterOpen);
    }

    const filterChange = (event) => {
        const {checked, value, attributes: { "data-group": {nodeValue: group} }} = event.target;
        // Do not allow to remove the only filter
        if (!(!checked && filterCount === 1)) {
            setFilterCount(checked? filterCount + 1: filterCount - 1);
            setFilterMeta({...filterMeta, [group]: { ...filterMeta[group], [value]: checked }});
        } else {
            event.preventDefault();
            toast.dark(Errors['onlyFilter'], {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }

    const displayFilterCount = () => {
        if (filterCount < totalFilterCount) {
            return `(${filterCount})`;
        }

        return '';
    }

    return (
        <React.Fragment>
            <div className="filter-btn-container">
                <div className="filter-button" onClick={onFilter}>Filter {displayFilterCount()}</div>
            </div>
            <section>
                <article className="grid">
                    {props.columns.length >= 0 &&
                        <Grid columns={props.columns}
                              rows={props.rows}
                              onSort={onSort}
                              onRowRefresh={onRowRefresh}
                              sortMeta={sortMeta}
                              filterMeta={filterMeta}/>}
                </article>
                <article className={`filter ${(isFilterOpen? 'show': 'hide')}`}>
                    <Filter headings={filterMeta? Object.keys(filterMeta): []}
                            filterMeta={filterMeta}
                            filterChange={filterChange}/>
                </article>
            </section>

            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                progressClassName="toast-progress"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </React.Fragment>
    )
}