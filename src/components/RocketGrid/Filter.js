import React from 'react'

import './Filter.css'

const Filter = ({filterMeta, filterChange, columnNameMeta}) => {
  return (
    <>
      {/*Show the filter data (hardcoded in API) in filter pane */}
      {Object.keys(filterMeta).map((heading, i) => {
        return (
          <div key={i} className="filter-group">
            <div className="filter-heading">
              {columnNameMeta[heading]}
            </div>
            {Object.keys(filterMeta[heading]).map((list, i) => {
              return (
                <div key={i} className="filter-block">
                  <div className="outer-label">
                    <label htmlFor={list}>{list}</label>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={filterMeta[heading][list]}
                    id={list}
                    name={list}
                    value={list}
                    onClick={filterChange}
                    data-group={heading}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export default Filter
