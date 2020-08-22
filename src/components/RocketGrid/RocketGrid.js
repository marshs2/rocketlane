import React, { useState, useEffect } from 'react';
import './RocketGrid.css';

import Grid from './Grid';
import Filter from './Filter';
import BodyCell from './BodyCell';
import { FilterModel } from '../../api/Model';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Errors }  from '../../api/Errors';

const RocketGrid = ({ columns, rows, clickOptions }) => {
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [filterMeta, setFilterMeta] = useState({});
    const [filterCount, setFilterCount] = useState(0);
    const [totalFilterCount, setTotalFilterCount] = useState(0);
    // To ensure we search only on groups where there is atleast one filter selected
    const [filterGroupWithValues, setFilterGroupWithValues] = useState({});
    const [sortMeta, setSortMeta] = useState({});

    const typeMeta = {}; // Eg. { region: string, units: number... }
    const sortable = {}; // Eg. { date: false, unitcost: true... }
    const columnNameMeta = {};

    // Get the latest sortable and typeMeta data on every render of Grid
    if (columns.length) {
        columns.forEach((column) => {
            typeMeta[column['name']] = column['type'];
            sortable[column['name']] = column['sortable'];
            columnNameMeta[column['name']] = column['displayName'];
        });
    }

    useEffect(() => {
        let sortMeta = localStorage.getItem('sort-meta'),
            filterMeta = localStorage.getItem('filter-meta'),
            isFilterOpen = localStorage.getItem('isFilterOpen');
        if (sortMeta) setSortMeta(JSON.parse(sortMeta));
        if (isFilterOpen) setFilterOpen(JSON.parse(isFilterOpen));
        if (filterMeta) {
            setFilterMeta(JSON.parse(filterMeta))
        } else {
            // Get the default filter meta list if not available in LocalStorage alreadty
            setFilterMeta(FilterModel())
        }
    }, [])

    useEffect(() => {
        if (filterMeta) {
            let filterCount = 0, totalFilterCount = 0, lfilterGroupWithValues = {};
            Object.keys(filterMeta).forEach(group => {
                Object.keys(filterMeta[group]).forEach((list) => {
                    totalFilterCount++;
                    if (filterMeta[group][list]) {
                        filterCount++;
                    }
                    if (filterMeta[group][list]) {
                        lfilterGroupWithValues[group] = true;
                    }
                    setFilterGroupWithValues(lfilterGroupWithValues);
                })
            });
            setFilterCount(filterCount);
            setTotalFilterCount(totalFilterCount);
        }   
    }, [filterMeta]);

    // Data Persistence Effect for all data, sorting, filtering, filterOpen 
    useEffect(() => {
        localStorage.setItem('sort-meta', JSON.stringify(sortMeta));
        localStorage.setItem('filter-meta', JSON.stringify(filterMeta));
        localStorage.setItem('isFilterOpen', JSON.stringify(isFilterOpen));
    }, [sortMeta, filterMeta, isFilterOpen]);

    const onSort = (event, ref) => {

        if (ref.current.contains(event.target)){
            const nodeContent = ref.current.textContent;
            const { attributes: { "data-column-name": {nodeValue} } } = ref.current;

            // If Column is not sortable, show Toast Message
            if (!sortable[nodeValue]) {
                toast.dark(`"${nodeContent}" ${Errors['notSortable']}`, {
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

            // Order of Sorting is maintained here
            if (!(nodeValue in sortMeta)) {
                setSortMeta({[nodeValue]: 'asc'});
            } else {
                let nextSort;

                switch (sortMeta[nodeValue]) {
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

                setSortMeta({...sortMeta, [nodeValue]: nextSort});

            }
        }
    }

    // Populate the data from Persisted Data - from "Grid" Component
    const onRowRefresh = () => {
        rows = [...rows];
        let sortMetaKeys = sortMeta ? Object.keys(sortMeta): {};

        if (rows.length && sortMetaKeys.length) {
            // Current Sort Column is determined by this
            let key = sortMetaKeys[0]; // Eg. { units: 'asc' } 

            // Sort String and Number as such
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

        // Actual render, filter/map based on the sort and filter criterias 
        console.log(filterGroupWithValues);
        return rows
            .filter(row => {
                // row - { date: '1/16/20', items: 'Pencil' ..}
                // filterMeta - { items: {binder: false, Pencil: true..}, ...} 
                let rowKeys = Object.keys(row);
                for (let i = 0; i < rowKeys.length; i++) {
                    if (rowKeys[i] in filterMeta && rowKeys[i] in filterGroupWithValues) {
                        if (!filterMeta[rowKeys[i]][row[rowKeys[i]]]) {
                            return false;
                        }
                    }
                }
                return true;
            })
            .map((row, i) => 
                <BodyCell key={i} row={row} columns={columns} sortMeta={sortMeta} clickOptions={clickOptions}/> )
    }

    const onFilter = () => {
        setFilterOpen(!isFilterOpen);
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
        <>
            <div className="filter-btn-container">
                <div className="filter-button" onClick={onFilter}>Filter {displayFilterCount()}</div>
            </div>
            <section className="layout">
                <article className="main-content">
                    {columns.length >= 0 &&
                        <Grid columns={columns}
                              rows={rows}
                              onSort={onSort}
                              onRowRefresh={onRowRefresh}
                              sortMeta={sortMeta}
                              filterMeta={filterMeta}/>}
                </article>
                <article className={`side-content filter ${(isFilterOpen? 'show': 'hide')}`}>
                    <Filter filterMeta={filterMeta}
                            filterChange={filterChange}
                            columnNameMeta={columnNameMeta}/>
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
        </>
    )
}

export default RocketGrid;