import React from 'react';

import './Filter.css';

export default function Filter (props) {
    return (
        <React.Fragment>
            {
                props.headings.map((heading, i) => {
                    return (
                        <div key={i} className="filter-group">
                            <div className="filter-heading">{heading[0].toUpperCase().concat(heading.slice(1))}</div>
                            {Object.keys(props.filterMeta[heading]).map((list, i) => {
                                return (
                                    <div key={i} className="filter-block">
                                        <div className="outer-label">
                                            <label htmlFor={list}>{list}</label>
                                        </div>
                                        <input type="checkbox"  
                                            defaultChecked={props.filterMeta[heading][list]}
                                            id={list} name={list} value={list}
                                            onClick={props.filterChange}
                                            data-group={heading}/>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }


            {/*<div className="filter-group">
                <div className="filter-heading">Items</div>
                <div className="filter-block">
                    <div className="outer-label">
                        <label for="binder">Binder</label>
                    </div>
                    <input type="checkbox" id="binder" name="binder" value="binder" />
                </div>
                <div className="filter-block">
                    <div className="outer-label">
                        <label for="pencil">Pencil</label>
                    </div>
                    <input type="checkbox" id="pencil" name="pencil" value="pencil" />
                </div>
                <div className="filter-block">
                    <div className="outer-label">
                        <label for="pen">Pen</label>
                    </div>
                    <input type="checkbox" id="pen" name="pen" value="pen" />
                </div>
            </div>
            <div className="filter-group">
                <div className="filter-heading">Region</div>
                <div className="filter-block">
                    <div className="outer-label">
                        <label for="east">East</label>
                    </div>
                    <input type="checkbox" id="east" name="east" value="east" />
                </div>
                <div className="filter-block">
                    <div className="outer-label">
                        <label for="central">Central</label>
                    </div>
                    <input type="checkbox" id="central" name="central" value="central" />
                </div>
                <div className="filter-block">
                    <div className="outer-label">
                        <label for="west">West</label>
                    </div>
                    <input type="checkbox" id="west" name="west" value="west" />
                </div>
            </div>*/}
        </React.Fragment>
    )
}