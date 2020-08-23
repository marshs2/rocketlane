import React, { useRef } from 'react'
import './RocketGrid.css'
import './HeaderCell.css'

const HeaderCell = ({column, sortMeta, onSort}) => {

  const ref = useRef();

  const getIcon = () => {
    return sortMeta[column.name] === 'asc' ? 'fa-angle-up' : 'fa-angle-down'
  }

  return (
    <th
      ref={ref}
      data-column-name={column.name}
      onClick={(event) => onSort(event, ref)}
      className={`header-cell ${column.sortable ? 'sortable' : null}`}
    >
      <span>
        {column.displayName}
        {sortMeta[column.name] && (
          <i className={`fa ${getIcon()}`}></i>
        )}
      </span>
    </th>
  )
}

export default HeaderCell;
