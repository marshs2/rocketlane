import React from 'react'

import './Filter.css'

const Filter = ({headings, filterMeta, filterChange}) => {
  return (
    <>
      {/*Show the filter data (hardcoded in API) in filter pane */}
      {headings.map((heading, i) => {
        return (
          <div key={i} className="filter-group">
            <div className="filter-heading">
              {heading[0].toUpperCase().concat(heading.slice(1))}
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
