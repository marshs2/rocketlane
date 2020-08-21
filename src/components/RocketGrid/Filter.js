import React from 'react'

import './Filter.css'

const Filter = (props) => {
  return (
    <React.Fragment>
      {/*Show the filter data (hardcoded in API) in filter pane */}
      {props.headings.map((heading, i) => {
        return (
          <div key={i} className="filter-group">
            <div className="filter-heading">
              {heading[0].toUpperCase().concat(heading.slice(1))}
            </div>
            {Object.keys(props.filterMeta[heading]).map((list, i) => {
              return (
                <div key={i} className="filter-block">
                  <div className="outer-label">
                    <label htmlFor={list}>{list}</label>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={props.filterMeta[heading][list]}
                    id={list}
                    name={list}
                    value={list}
                    onClick={props.filterChange}
                    data-group={heading}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default Filter
